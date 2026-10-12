"""Rebuild the NSO snapshot from its original Excel. Requires openpyxl.
Usage: python3 scripts/import-admin.py /path/to/BangChuyendoiDVHC.xlsx
New source releases require human review of the date, counts and test expectations.
"""
import hashlib
import json
import re
import sys
from pathlib import Path
import openpyxl

base = Path(__file__).resolve().parent.parent
target = base / 'core/admin-data.js'
existing = target.read_text()
metadata = json.loads(existing[existing.index('this,') + 5:-3])
source = Path(sys.argv[1])
if hashlib.sha256(source.read_bytes()).hexdigest() != metadata['sha256']:
    raise SystemExit('Source differs from reviewed snapshot. Review it before replacing the dataset.')
rows = []
book = openpyxl.load_workbook(source, read_only=True, data_only=True)
for raw in book['Tổng hợp_không merge '].iter_rows(min_row=3, values_only=True):
    if not raw[2]:
        continue
    row = [' '.join(str(v).split()) if v is not None else '' for v in raw[:8]]
    row[2] = row[2].zfill(5)
    row[4] = row[4].zfill(5) if row[4] else ''
    assert re.fullmatch(r'\d{5}', row[2])
    assert not row[4] or re.fullmatch(r'\d{5}', row[4])
    rows.append(row)
assert len(rows) == 10571 and len({r[2] for r in rows}) == 3321
strings, indices = [], {}
def encode(value):
    if value not in indices:
        indices[value] = len(strings)
        strings.append(value)
    return indices[value]
metadata['rows'] = [[encode(v) for v in row] for row in rows]
metadata['strings'] = strings
prefix = existing[:existing.index('this,') + 5]
target.write_text(prefix + json.dumps(metadata, ensure_ascii=False, separators=(',', ':')) + ');\n')
print('Rebuilt 10,571 source relations; 3,321 new commune codes. No missing old code invented.')
