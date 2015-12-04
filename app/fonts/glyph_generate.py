#! /usr/bin/python3


# 二进制表示顺序：阳为1，阴为0；爻从上到下，二进制从右至左。


trigrams  = [
('☰', 0x2630, '111', '乾', '乾'),
('☱', 0x2631, '110', '兌', '兌'),
('☲', 0x2632, '101', '離', '離'),
('☳', 0x2633, '100', '震', '震'),
('☴', 0x2634, '011', '巽', '巽'),
('☵', 0x2635, '010', '坎', '坎'),
('☶', 0x2636, '001', '艮', '艮'),
('☷', 0x2637, '000', '坤', '坤')
] 

hexagrams = [
('䷀', 0x4DC0, '111111', '乾',   '乾为天'),
('䷁', 0x4DC1, '000000', '坤',   '坤为地'),
('䷂', 0x4DC2, '100010', '屯',   '水雷屯'), # 屯zhūn
('䷃', 0x4DC3, '010001', '蒙',   '山水蒙'),
('䷄', 0x4DC4, '111010', '需',   '水天需'),
('䷅', 0x4DC5, '010111', '讼',   '天水讼'),
('䷆', 0x4DC6, '010000', '师',   '地水师'),
('䷇', 0x4DC7, '000010', '比',   '水地比'),
('䷈', 0x4DC8, '111011', '小畜', '风天小畜'),
('䷉', 0x4DC9, '110111', '履',   '天泽履'),
('䷊', 0x4DCA, '111000', '泰',   '地天泰'),
('䷋', 0x4DCB, '000111', '否',   '天地否'),
('䷌', 0x4DCC, '101111', '同人', '天火同人'),
('䷍', 0x4DCD, '111101', '大有', '火天大有'),
('䷎', 0x4DCE, '001000', '谦',   '地山谦'),
('䷏', 0x4DCF, '000100', '豫',   '雷地豫'),
('䷐', 0x4DD0, '100110', '随',   '泽雷随'), 
('䷑', 0x4DD1, '011001', '蛊',   '山风蛊'),
('䷒', 0x4DD2, '110000', '临',   '地泽临'),
('䷓', 0x4DD3, '000011', '观',   '风地观'),
('䷔', 0x4DD4, '100101', '噬嗑', '火雷噬嗑'), # 噬嗑shì hé
('䷕', 0x4DD5, '101001', '贲',   '山火贲'),  #贲bì
('䷖', 0x4DD6, '000001', '剥',   '山地剥'),
('䷗', 0x4DD7, '100000', '复',   '地雷复'),
('䷘', 0x4DD8, '100111', '无妄', '天雷无妄'),
('䷙', 0x4DD9, '111001', '大畜', '山天大畜'),
('䷚', 0x4DDA, '100001', '颐',   '山雷颐'),
('䷛', 0x4DDB, '011110', '大过', '泽风大过'),
('䷜', 0x4DDC, '010010', '坎',   '坎为水'),
('䷝', 0x4DDD, '101101', '离',   '离为火'),
# ----下经（三十四卦） 
('䷞', 0x4DDE, '001110', '咸', '泽山咸'),
('䷟', 0x4DDF, '011100', '恒', '雷风恒'),
('䷠', 0x4DE0, '001111', '遁', '天山遁'), # 遁dùn
('䷡', 0x4DE1, '111100', '大壮', '雷天大壮'),
('䷢', 0x4DE2, '000101', '晋', '火地晋'),
('䷣', 0x4DE3, '101000', '明夷', '地火明夷'),
('䷤', 0x4DE4, '101011', '家人', '风火家人'),
('䷥', 0x4DE5, '110101', '睽', '火泽睽'), # 睽kuí
('䷦', 0x4DE6, '001010', '蹇', '水山蹇”'), # 蹇jiǎn
('䷧', 0x4DE7, '010100', '解', '雷水解'), # jiè
('䷨', 0x4DE8, '110001', '损', '山泽损'),
('䷩', 0x4DE9, '100011', '益', '风雷益'),
('䷪', 0x4DEA, '111110', '夬', '泽天夬'),
('䷫', 0x4DEB, '011111', '姤', '天风姤'),
('䷬', 0x4DEC, '000110', '萃', '泽地萃'),
('䷭', 0x4DED, '011000', '升', '地风升'),
('䷮', 0x4DEE, '010110', '困', '“泽水困'),
('䷯', 0x4DEF, '011010', '井', '水风井'),
('䷰', 0x4DF0, '101110', '革', '泽火革'),
('䷱', 0x4DF1, '011101', '鼎', '火风鼎'),
('䷲', 0x4DF2, '100100', '震', '震为雷'),
('䷳', 0x4DF3, '001001', '艮', '艮为山'),
('䷴', 0x4DF4, '001011', '渐', '风山渐'),
('䷵', 0x4DF5, '110100', '归妹', '雷泽归妹'),
('䷶', 0x4DF6, '101100', '丰', '雷火丰'),
('䷷', 0x4DF7, '001101', '旅', '火山旅'),
('䷸', 0x4DF8, '011011', '巽', '巽为风'),
('䷹', 0x4DF9, '110110', '兑', '兑为泽'),
('䷺', 0x4DFA, '010011', '涣', '风水涣'),
('䷻', 0x4DFB, '110010', '节', '水泽节'),
('䷼', 0x4DFC, '110011', '中孚', '风泽中孚'),
('䷽', 0x4DFD, '001100', '小过', '雷山小过'),
('䷾', 0x4DFE, '101010', '既济', '水火既济'),
('䷿', 0x4DFF, '010101', '未济', '火水未济'),
]


hexagram_glyph = {
	'top':50, 'yao-height':110, 'yao-sep': 88, 
	'yang-width':1100, 'yin-width':475,
	'yang-x1' : 50, 'yin-x1' : 50, 'yin-x2' : 675
}

trigram_glyph = {
	'top':55, 'yao-height':240, 'yao-sep': 185, 
	'yang-width':1100, 'yin-width':475,
	'yang-x1' : 50, 'yin-x1' : 50, 'yin-x2' : 675
}


import sys

def print_glyph(letters, glyph_settings, file=sys.stdout) :
	for i, letter in enumerate(letters):
		char = letter[0]
		unicode_hex = '&#' + hex(letter[1])[1:] + ';'
		binaries = letter[2]
		shortname, longname = letter[3], letter[4]

		paths = []
		for j, yao in enumerate(binaries):

			if yao == '1' :
				fmtstr = 'M50 {y}h{yang-width}v{yao-height}h-{yang-width}v-{yao-height}Z'
			else:
				fmtstr = 'M{yin-x1} {y}h{yin-width}v{yao-height}h-{yin-width}v-{yao-height}Z'
				fmtstr += ' M{yin-x2} {y}h{yin-width}v{yao-height}h-{yin-width}v-{yao-height}Z'

			y =  glyph_settings['top'] + (glyph_settings['yao-height'] + glyph_settings['yao-sep']) * j 		
			params = {'y' : y}
			params.update(glyph_settings)
			paths.append(fmtstr.format(**params))
		
		print("""
<!-- [{no}] {char} , {binaries}, {shortname}, {longname} -->
<glyph unicode="{unicode_hex}" d="
{pathdata}
" />
		""".format(pathdata='\n'.join(paths), no=i+1,
				   unicode_hex=unicode_hex,
				   char=char, 
				   binaries=binaries, 
				   shortname=shortname, 
				   longname=longname), file=file)


def print_font_svg(file=sys.stdout):
	print("""\
<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd" >
<!-- This file is AUTO-GENERATED by the script 'glyph_generate.py'. -->
<!-- http://onlinefontconverter.com/ It's used to convert svg font into woff. -->
<svg xmlns="http://www.w3.org/2000/svg">
<metadata></metadata>
<defs>
<font id="BaGua" horiz-adv-x="1200" >
<font-face units-per-em="1200"  ascent="960" descent="-240" />
<missing-glyph horiz-adv-x="500" />	
	""", file=file)

	print_glyph(trigrams, trigram_glyph, file=file)
	print_glyph(hexagrams, hexagram_glyph, file=file)

	print("""
</font>
</defs>
</svg> 
	""", file=file)

def export_bagua_svg():
	with open('BaGua.svg', 'w') as f:
		print_font_svg(file=f)

# export_bagua_svg()


def print_javascript(grams):

	from collections import OrderedDict
	data = []
	for i, gram in	enumerate(grams):
		gramdict = OrderedDict([
			('ord', i+1),
			('char', gram[0]), 
			('bincode', gram[2]), 
			('shortname', gram[3]), 
			('longname', gram[4])])

		data.append(gramdict)

	import json

	print(json.dumps(data, ensure_ascii=False, indent=4))

print('var trigrams =', end=' ')
print_javascript(trigrams)

print('var hexagrams =', end=' ')
print_javascript(hexagrams)