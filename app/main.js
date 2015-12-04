'use strict';

var mainapp = angular.module('mainapp', ['ngAnimate']);


mainapp.controller('BaguaCtrl', function ($scope, $timeout) {
	$scope.trigrams = trigrams;
	$scope.hexagrams = hexagrams;

	$scope.inputs = ['', '', '', ''];
	$scope.inputIndex = 0;

    $scope.btnLabels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

	$scope.enter = function(label) {
		if ($scope.inputIndex >= 4) {
			// console.log('full');
			return;
		}
        // console.log('enter: %s, %d', label, $scope.inputIndex);
        $scope.inputs[$scope.inputIndex] = label;
		$scope.inputIndex += 1;
		
		if ($scope.inputIndex == 4) {
			caculate();
		}
	};

	$scope.delete = function() {
		if ($scope.inputIndex == 0) {
			return;
		}
		$scope.inputs[$scope.inputIndex - 1] = '';
		$scope.inputIndex -= 1;

		if ($scope.inputIndex < 4) {
			clearOutput();
		}
	};	

	$scope.clear = function() {
		$scope.inputIndex = 0;
		for(var i = 0; i< 4; i++) {
			$scope.inputs[i] = '';
		}	
		clearOutput();		
	};

	var clearOutput = function() {
		$scope.zhugua = '';
		$scope.hugua = '';
		$scope.biangua = '';
		$scope.cuogua = '';
		$scope.zonggua = '';
	}

	var lookup = function(bincode, grams) {
		for (var i = 0; i < grams.length; i++) {
			if (grams[i].bincode == bincode) {
				return grams[i];
			}
		};
	};	

	var caculate = function() {
		var inputs = $scope.inputs;
		var trigrams = $scope.trigrams;

        console.log('bagua:' + inputs);

		// 计算主卦
        var upper = (parseInt(inputs[2]) + parseInt(inputs[3])) % 8;
        if (upper == 0) {
            upper = 8;
        }
        var lower = (parseInt(inputs[0]) + parseInt(inputs[1])) % 8;
        if (lower == 0) {
            lower = 8;
        }
		var bincode = trigrams[upper - 1].bincode + trigrams[lower - 1].bincode;
		var zhugua = lookup(bincode, hexagrams);
        console.log('主卦=', zhugua);
		
		// 计算互卦
		// 本卦中的第三、四、五爻，拿出来作为互卦的上卦，
		// 本卦的第二、三、四爻，拿出来 作为互卦的下卦。上卦、下卦组合在一起，就得到了互卦。 
		var bincode = zhugua.bincode.slice(1,4) + zhugua.bincode.slice(2,5) ;
		var hugua = lookup(bincode, hexagrams);
        console.log('互卦=', hugua);

		// 变卦： 上卦数字和下卦数字相加，按6求余数（整除就是6），从下数，然后求相反的爻。
        var bincode = zhugua.bincode;
        var bianguaNum = 0;
        bianguaNum += parseInt(inputs[0]) + parseInt(inputs[1]); 
        bianguaNum += parseInt(inputs[2]) + parseInt(inputs[3])
		var bianguaNum = bianguaNum % 6; // 0 ～ 5
        if (bianguaNum == 0) {
            bianguaNum = 6;
        } 
		var bianguaPos = bianguaNum - 1 ;
		if (bincode[bianguaPos] == '1') {
			bincode = bincode.slice(0, bianguaPos) + '0' + bincode.slice(bianguaPos + 1) ;
		} else {
			bincode = bincode.slice(0, bianguaPos) + '1' + bincode.slice(bianguaPos + 1) ;
		}
		var biangua = lookup(bincode, hexagrams);
        console.log('变卦(%d)=', bianguaNum, biangua);


		// 错卦是与本卦阴阳全颠倒的卦，即每个爻 阴变阳、阳变阴而得到的卦。 
        var bincode = '';
        for (var i=0; i < zhugua.bincode.length; i++) {
        	if (zhugua.bincode[i] == '1') {
        		bincode += '0';
        	} else {
        		bincode += '1';
        	}
        }
        console.log(bincode);
		var cuogua = lookup(bincode, hexagrams);        

		// 综卦就是把本卦倒过来看。它们通常是从事物的反面来看事物 的发展变化。
        var bincode = '';
        for (var i=zhugua.bincode.length - 1; i >=0 ; i--) {
        	bincode += zhugua.bincode[i];
        }
		var zonggua = lookup(bincode, hexagrams);        


		console.log('Result=', zhugua.char, hugua.char, cuogua.char, zonggua.char);

		$scope.zhugua = zhugua;
		$scope.hugua = hugua;
		$scope.biangua = biangua;
		$scope.cuogua = cuogua;
		$scope.zonggua = zonggua;
	};
	console.log('init');

    var qigua = function() {
        // 根据当前时间确定卦象
        var time = new Date();
        var h = time.getHours().toString();
        var m = time.getMinutes().toString();
        if (h.length == 1) {
            $scope.inputs[0] = '0';
            $scope.inputs[1] = h[0];            
        } else {
            $scope.inputs[0] = h[0];
            $scope.inputs[1] = h[1];            
        }

        if (m.length == 1) {
            $scope.inputs[2] = '0';
            $scope.inputs[3] = m[0];            
        } else {
            $scope.inputs[2] = m[0];
            $scope.inputs[3] = m[1];            
        }
        // $scope.inputs = ['1', '1', '5', '4'];
        $scope.inputIndex = 4;
        caculate();
    };

    $scope.go = function() {
        $scope.clear();
        $timeout(function() {
            qigua();
        }, 500);
    };

    $timeout(function() {
        qigua();
    }, 1000);

});




var trigrams = [
    {
        "ord": 1, 
        "char": "☰", 
        "bincode": "111", 
        "shortname": "乾", 
        "longname": "乾"
    }, 
    {
        "ord": 2, 
        "char": "☱", 
        "bincode": "110", 
        "shortname": "兌", 
        "longname": "兌"
    }, 
    {
        "ord": 3, 
        "char": "☲", 
        "bincode": "101", 
        "shortname": "離", 
        "longname": "離"
    }, 
    {
        "ord": 4, 
        "char": "☳", 
        "bincode": "100", 
        "shortname": "震", 
        "longname": "震"
    }, 
    {
        "ord": 5, 
        "char": "☴", 
        "bincode": "011", 
        "shortname": "巽", 
        "longname": "巽"
    }, 
    {
        "ord": 6, 
        "char": "☵", 
        "bincode": "010", 
        "shortname": "坎", 
        "longname": "坎"
    }, 
    {
        "ord": 7, 
        "char": "☶", 
        "bincode": "001", 
        "shortname": "艮", 
        "longname": "艮"
    }, 
    {
        "ord": 8, 
        "char": "☷", 
        "bincode": "000", 
        "shortname": "坤", 
        "longname": "坤"
    }
];

var hexagrams = [
    {
        "ord": 1, 
        "char": "䷀", 
        "bincode": "111111", 
        "shortname": "乾", 
        "longname": "乾为天"
    }, 
    {
        "ord": 2, 
        "char": "䷁", 
        "bincode": "000000", 
        "shortname": "坤", 
        "longname": "坤为地"
    }, 
    {
        "ord": 3, 
        "char": "䷂", 
        "bincode": "100010", 
        "shortname": "屯", 
        "longname": "水雷屯"
    }, 
    {
        "ord": 4, 
        "char": "䷃", 
        "bincode": "010001", 
        "shortname": "蒙", 
        "longname": "山水蒙"
    }, 
    {
        "ord": 5, 
        "char": "䷄", 
        "bincode": "111010", 
        "shortname": "需", 
        "longname": "水天需"
    }, 
    {
        "ord": 6, 
        "char": "䷅", 
        "bincode": "010111", 
        "shortname": "讼", 
        "longname": "天水讼"
    }, 
    {
        "ord": 7, 
        "char": "䷆", 
        "bincode": "010000", 
        "shortname": "师", 
        "longname": "地水师"
    }, 
    {
        "ord": 8, 
        "char": "䷇", 
        "bincode": "000010", 
        "shortname": "比", 
        "longname": "水地比"
    }, 
    {
        "ord": 9, 
        "char": "䷈", 
        "bincode": "111011", 
        "shortname": "小畜", 
        "longname": "风天小畜"
    }, 
    {
        "ord": 10, 
        "char": "䷉", 
        "bincode": "110111", 
        "shortname": "履", 
        "longname": "天泽履"
    }, 
    {
        "ord": 11, 
        "char": "䷊", 
        "bincode": "111000", 
        "shortname": "泰", 
        "longname": "地天泰"
    }, 
    {
        "ord": 12, 
        "char": "䷋", 
        "bincode": "000111", 
        "shortname": "否", 
        "longname": "天地否"
    }, 
    {
        "ord": 13, 
        "char": "䷌", 
        "bincode": "101111", 
        "shortname": "同人", 
        "longname": "天火同人"
    }, 
    {
        "ord": 14, 
        "char": "䷍", 
        "bincode": "111101", 
        "shortname": "大有", 
        "longname": "火天大有"
    }, 
    {
        "ord": 15, 
        "char": "䷎", 
        "bincode": "001000", 
        "shortname": "谦", 
        "longname": "地山谦"
    }, 
    {
        "ord": 16, 
        "char": "䷏", 
        "bincode": "000100", 
        "shortname": "豫", 
        "longname": "雷地豫"
    }, 
    {
        "ord": 17, 
        "char": "䷐", 
        "bincode": "100110", 
        "shortname": "随", 
        "longname": "泽雷随"
    }, 
    {
        "ord": 18, 
        "char": "䷑", 
        "bincode": "011001", 
        "shortname": "蛊", 
        "longname": "山风蛊"
    }, 
    {
        "ord": 19, 
        "char": "䷒", 
        "bincode": "110000", 
        "shortname": "临", 
        "longname": "地泽临"
    }, 
    {
        "ord": 20, 
        "char": "䷓", 
        "bincode": "000011", 
        "shortname": "观", 
        "longname": "风地观"
    }, 
    {
        "ord": 21, 
        "char": "䷔", 
        "bincode": "100101", 
        "shortname": "噬嗑", 
        "longname": "火雷噬嗑"
    }, 
    {
        "ord": 22, 
        "char": "䷕", 
        "bincode": "101001", 
        "shortname": "贲", 
        "longname": "山火贲"
    }, 
    {
        "ord": 23, 
        "char": "䷖", 
        "bincode": "000001", 
        "shortname": "剥", 
        "longname": "山地剥"
    }, 
    {
        "ord": 24, 
        "char": "䷗", 
        "bincode": "100000", 
        "shortname": "复", 
        "longname": "地雷复"
    }, 
    {
        "ord": 25, 
        "char": "䷘", 
        "bincode": "100111", 
        "shortname": "无妄", 
        "longname": "天雷无妄"
    }, 
    {
        "ord": 26, 
        "char": "䷙", 
        "bincode": "111001", 
        "shortname": "大畜", 
        "longname": "山天大畜"
    }, 
    {
        "ord": 27, 
        "char": "䷚", 
        "bincode": "100001", 
        "shortname": "颐", 
        "longname": "山雷颐"
    }, 
    {
        "ord": 28, 
        "char": "䷛", 
        "bincode": "011110", 
        "shortname": "大过", 
        "longname": "泽风大过"
    }, 
    {
        "ord": 29, 
        "char": "䷜", 
        "bincode": "010010", 
        "shortname": "坎", 
        "longname": "坎为水"
    }, 
    {
        "ord": 30, 
        "char": "䷝", 
        "bincode": "101101", 
        "shortname": "离", 
        "longname": "离为火"
    }, 
    {
        "ord": 31, 
        "char": "䷞", 
        "bincode": "001110", 
        "shortname": "咸", 
        "longname": "泽山咸"
    }, 
    {
        "ord": 32, 
        "char": "䷟", 
        "bincode": "011100", 
        "shortname": "恒", 
        "longname": "雷风恒"
    }, 
    {
        "ord": 33, 
        "char": "䷠", 
        "bincode": "001111", 
        "shortname": "遁", 
        "longname": "天山遁"
    }, 
    {
        "ord": 34, 
        "char": "䷡", 
        "bincode": "111100", 
        "shortname": "大壮", 
        "longname": "雷天大壮"
    }, 
    {
        "ord": 35, 
        "char": "䷢", 
        "bincode": "000101", 
        "shortname": "晋", 
        "longname": "火地晋"
    }, 
    {
        "ord": 36, 
        "char": "䷣", 
        "bincode": "101000", 
        "shortname": "明夷", 
        "longname": "地火明夷"
    }, 
    {
        "ord": 37, 
        "char": "䷤", 
        "bincode": "101011", 
        "shortname": "家人", 
        "longname": "风火家人"
    }, 
    {
        "ord": 38, 
        "char": "䷥", 
        "bincode": "110101", 
        "shortname": "睽", 
        "longname": "火泽睽"
    }, 
    {
        "ord": 39, 
        "char": "䷦", 
        "bincode": "001010", 
        "shortname": "蹇", 
        "longname": "水山蹇"
    }, 
    {
        "ord": 40, 
        "char": "䷧", 
        "bincode": "010100", 
        "shortname": "解", 
        "longname": "雷水解"
    }, 
    {
        "ord": 41, 
        "char": "䷨", 
        "bincode": "110001", 
        "shortname": "损", 
        "longname": "山泽损"
    }, 
    {
        "ord": 42, 
        "char": "䷩", 
        "bincode": "100011", 
        "shortname": "益", 
        "longname": "风雷益"
    }, 
    {
        "ord": 43, 
        "char": "䷪", 
        "bincode": "111110", 
        "shortname": "夬", 
        "longname": "泽天夬"
    }, 
    {
        "ord": 44, 
        "char": "䷫", 
        "bincode": "011111", 
        "shortname": "姤", 
        "longname": "天风姤"
    }, 
    {
        "ord": 45, 
        "char": "䷬", 
        "bincode": "000110", 
        "shortname": "萃", 
        "longname": "泽地萃"
    }, 
    {
        "ord": 46, 
        "char": "䷭", 
        "bincode": "011000", 
        "shortname": "升", 
        "longname": "地风升"
    }, 
    {
        "ord": 47, 
        "char": "䷮", 
        "bincode": "010110", 
        "shortname": "困", 
        "longname": "“泽水困"
    }, 
    {
        "ord": 48, 
        "char": "䷯", 
        "bincode": "011010", 
        "shortname": "井", 
        "longname": "水风井"
    }, 
    {
        "ord": 49, 
        "char": "䷰", 
        "bincode": "101110", 
        "shortname": "革", 
        "longname": "泽火革"
    }, 
    {
        "ord": 50, 
        "char": "䷱", 
        "bincode": "011101", 
        "shortname": "鼎", 
        "longname": "火风鼎"
    }, 
    {
        "ord": 51, 
        "char": "䷲", 
        "bincode": "100100", 
        "shortname": "震", 
        "longname": "震为雷"
    }, 
    {
        "ord": 52, 
        "char": "䷳", 
        "bincode": "001001", 
        "shortname": "艮", 
        "longname": "艮为山"
    }, 
    {
        "ord": 53, 
        "char": "䷴", 
        "bincode": "001011", 
        "shortname": "渐", 
        "longname": "风山渐"
    }, 
    {
        "ord": 54, 
        "char": "䷵", 
        "bincode": "110100", 
        "shortname": "归妹", 
        "longname": "雷泽归妹"
    }, 
    {
        "ord": 55, 
        "char": "䷶", 
        "bincode": "101100", 
        "shortname": "丰", 
        "longname": "雷火丰"
    }, 
    {
        "ord": 56, 
        "char": "䷷", 
        "bincode": "001101", 
        "shortname": "旅", 
        "longname": "火山旅"
    }, 
    {
        "ord": 57, 
        "char": "䷸", 
        "bincode": "011011", 
        "shortname": "巽", 
        "longname": "巽为风"
    }, 
    {
        "ord": 58, 
        "char": "䷹", 
        "bincode": "110110", 
        "shortname": "兑", 
        "longname": "兑为泽"
    }, 
    {
        "ord": 59, 
        "char": "䷺", 
        "bincode": "010011", 
        "shortname": "涣", 
        "longname": "风水涣"
    }, 
    {
        "ord": 60, 
        "char": "䷻", 
        "bincode": "110010", 
        "shortname": "节", 
        "longname": "水泽节"
    }, 
    {
        "ord": 61, 
        "char": "䷼", 
        "bincode": "110011", 
        "shortname": "中孚", 
        "longname": "风泽中孚"
    }, 
    {
        "ord": 62, 
        "char": "䷽", 
        "bincode": "001100", 
        "shortname": "小过", 
        "longname": "雷山小过"
    }, 
    {
        "ord": 63, 
        "char": "䷾", 
        "bincode": "101010", 
        "shortname": "既济", 
        "longname": "水火既济"
    }, 
    {
        "ord": 64, 
        "char": "䷿", 
        "bincode": "010101", 
        "shortname": "未济", 
        "longname": "火水未济"
    }
];
