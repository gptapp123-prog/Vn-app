"""Rebuild public postal data from the retained official PDF; reject malformed rows."""
import pathlib, re, json, subprocess, hashlib

ROOT = pathlib.Path(__file__).resolve().parents[1]
source = ROOT / 'sources/postal-2334-2025.pdf'
text = subprocess.check_output(['pdftotext', '-layout', str(source), '-'], text=True)
# name | administrative code (19/2025) | plate prefixes (51/2025 Appendix 02) | old province names
spec = '''An Giang|91|67,68|An Giang,Kiên Giang
Bắc Ninh|24|98,99|Bắc Ninh,Bắc Giang
Cà Mau|96|69,94|Cà Mau,Bạc Liêu
Cao Bằng|04|11|Cao Bằng
Cần Thơ|92|65,83,95|Cần Thơ,Hậu Giang,Sóc Trăng
Đà Nẵng|48|43,92|Đà Nẵng,Quảng Nam
Đắk Lắk|66|47,78|Đắk Lắk,Phú Yên
Điện Biên|11|27|Điện Biên
Đồng Nai|75|39,60,93|Đồng Nai,Bình Phước
Đồng Tháp|82|63,66|Đồng Tháp,Tiền Giang
Gia Lai|52|77,81|Gia Lai,Bình Định
Hà Nội|01|29,30,31,32,33,40|Hà Nội
Hà Tĩnh|42|38|Hà Tĩnh
Hải Phòng|31|15,16,34|Hải Phòng,Hải Dương
Hồ Chí Minh|79|41,50,51,52,53,54,55,56,57,58,59,61,72|Hồ Chí Minh,Bình Dương,Bà Rịa - Vũng Tàu
Huế|46|75|Thừa Thiên Huế
Hưng Yên|33|17,89|Hưng Yên,Thái Bình
Khánh Hòa|56|79,85|Khánh Hòa,Ninh Thuận
Lai Châu|12|25|Lai Châu
Lạng Sơn|20|12|Lạng Sơn
Lào Cai|15|21,24|Lào Cai,Yên Bái
Lâm Đồng|68|48,49,86|Lâm Đồng,Đắk Nông,Bình Thuận
Ninh Bình|37|18,35,90|Ninh Bình,Hà Nam,Nam Định
Nghệ An|40|37|Nghệ An
Phú Thọ|25|19,28,88|Phú Thọ,Vĩnh Phúc,Hòa Bình
Quảng Ninh|22|14|Quảng Ninh
Quảng Ngãi|51|76,82|Quảng Ngãi,Kon Tum
Quảng Trị|44|73,74|Quảng Trị,Quảng Bình
Sơn La|14|26|Sơn La
Tây Ninh|80|62,70|Tây Ninh,Long An
Tuyên Quang|08|22,23|Tuyên Quang,Hà Giang
Thái Nguyên|19|20,97|Thái Nguyên,Bắc Kạn
Thanh Hóa|38|36|Thanh Hóa
Vĩnh Long|86|64,71,84|Vĩnh Long,Bến Tre,Trà Vinh'''
provinces = []
for i, line in enumerate(spec.splitlines(), 1):
    name, code, plates, old = line.split('|')
    # First page is the authoritative province-prefix index.
    row = next(l for l in text.split('\f')[0].splitlines() if re.match(r'^\s*'+str(i)+r'\s+', l))
    match = re.search(r'\s{2,}([\d, ]+)\s{2,}(\d+)\s*$', row)
    assert match, row
    prefixes = re.findall(r'\d{2}', match[1])
    provinces.append(dict(id=code, name=name, adminCode=code, plates=plates.split(','), postalPrefixes=prefixes,
                          oldNames=old.split(','), sourceIds=['postal','plates','admin','merger']))
communes, rejected, numbers = [], [], {}
current = None
for physicalPage, page in enumerate(text.split('\f')[1:], 2):
    for line in page.splitlines():
        header = re.match(r'^\s*(\d+)\s+(?:TỈNH|TP\.)\s+[^\d]+$', line)
        if header:
            current = provinces[int(header[1])-1]
            numbers[current['id']] = []
            continue
        match = re.match(r'^\s*(\d+)\s+(.+?)\s{2,}(\d{5,6})\s*$', line)
        if not match or current is None: continue
        number, name, code = match.groups()
        numbers[current['id']].append(int(number))
        record = dict(provinceId=current['id'], name=name.strip(), code=code, pdfPage=physicalPage, sourceId='postal')
        if not re.match(r'^(X\.|P\.|Đặc khu)\s+', name) or not re.fullmatch(r'\d{5}', code):
            record['reason'] = 'Tên địa phương lỗi trong nguồn' if '#VALUE!' in name else 'Mã nguồn không đủ chuẩn 5 số'
            rejected.append(record)
        else:
            assert code[:2] in current['postalPrefixes'], record
            communes.append(record)
for code, sequence in numbers.items():
    assert sequence == list(range(1, len(sequence)+1)), (code, sequence)
assert len(provinces) == 34 and len(communes)+len(rejected) == 3321
assert len(set(x['code'] for x in communes)) == len(communes)
assert len({n for p in provinces for n in p['oldNames']}) == 63
sources = {
 'postal':dict(title='QĐ 2334/QĐ-BKHCN · danh mục do Bộ KH&CN công bố', publisher='Bộ Khoa học và Công nghệ', effectiveFrom='2025-08-24', url='https://mst.gov.vn/van-ban-phap-luat/25175.htm', lookupUrl='https://mabuuchinh.vn/', pdfUrl='https://mic.mediacdn.vn/document/2025/8/27/danh-muc-ma-buu-chinh-quoc-gia-cho-doi-tuong-la-phuong-xa-va-don-vi-hanh-chinh-tuong-duong-1756261572483234512520.pdf', localFile='sources/postal-2334-2025.pdf'),
 'plates':dict(title='TT 51/2025/TT-BCA · Phụ lục 02', publisher='Bộ Công an / Cổng TTĐT Chính phủ', effectiveFrom='2025-07-01', url='https://vanban.chinhphu.vn/?classid=1&docid=214486&pageid=27160&typegroupid=6', pdfUrl='https://datafiles.chinhphu.vn/cpp/files/vbpq/2025/7/51-bca.signed.pdf', localFile='sources/plates-51-2025.pdf'),
 'admin':dict(title='QĐ 19/2025/QĐ-TTg · mã đơn vị hành chính cấp tỉnh', publisher='Báo Điện tử Chính phủ', effectiveFrom='2025-07-01', url='https://baochinhphu.vn/bang-danh-muc-va-ma-so-cua-34-tinh-thanh-moi-3321-don-vi-hanh-chinh-cap-xa-moi-102250704153652947.htm'),
 'merger':dict(title='NQ 202/2025/QH15 · đối chiếu địa giới trước sắp xếp', publisher='Báo Điện tử Chính phủ', effectiveFrom='2025-06-12', url='https://baochinhphu.vn/nghi-quyet-cua-quoc-hoi-ve-sap-xep-don-vi-hanh-chinh-cap-tinh-102250612191145158.htm')
}
for item in sources.values():
    item['reviewedAt']='2026-10-11'
    if item.get('localFile'): item['sha256']=hashlib.sha256((ROOT/item['localFile']).read_bytes()).hexdigest()
payload=dict(schemaVersion=1, reviewedAt='2026-10-11', geographyBasis='2025-07-01', sources=sources, provinces=provinces, communes=communes, rejected=rejected)
(ROOT/'reference-data.json').write_text(json.dumps(payload, ensure_ascii=False, indent=2)+'\n')
(ROOT/'reference-data.js').write_text('/* Generated by tools/build-reference-data.py; do not hand-edit postal rows. */\n(function(root){const data='+json.dumps(payload,ensure_ascii=False,separators=(',',':'))+';if(typeof module==="object"&&module.exports)module.exports=data;else root.VN_REFERENCE_DATA=data;})(typeof window!=="undefined"?window:globalThis);\n')
print(f'Built {len(provinces)} provinces, {len(communes)} postal rows; {len(rejected)} rejected source rows.')
