import re

data = open('wiki.html', 'r').read().replace('\n', '').replace('\t', '')
langs = data.split('</tr>')[:-1]

found = []
for lang in langs:
	search = re.search(r'<td>([0-9]+)<\/td>', lang)
	rank = search.group(1)
	print(rank)

	search = re.search(r'<a href="/wiki/.{0,50}" title=".{0,50}">(.{0,50})</a>', lang)
	englishName = search.group(1)
	print(englishName)
	englishName.replace('\\xca\\xbd', '\'')

	search = re.search(r'</td><td>(.{0,10})</td>', lang)
	speakers = search.group(1)
	found.append({
		'rank': rank,
		'name': englishName,
		'speakers': speakers
	})

codes = open('codes.csv', 'r').read().split('\n')
for code in codes:
	for f in found:
		if f['name'] in code:
			f['code'] = code.split(',')[0]


built = '{\n'
for f in found:
	code = 'XX'
	if 'code' in f:
		code = f['code']
		del f['code']
	
	c = str(f).replace('\'', '"')
	built += '"' + code + '":' + c + ',\n'
built = built[:-2]
built += '\n}'
open('gen.json', 'w').write(built)
