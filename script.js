//最初はテーブルを非表示に、使う方のみをあとから表示させる
document.getElementById("table4").style.display ="none";
document.getElementById("table6").style.display ="none";

//初期値代入
let inputTextElement = document.getElementById('inputText');
inputTextElement.value = '45000034000040000111D906C0A80001E0000009020802080020983C0202000000020000C0A80100FFFFFF000000000000000001';

/**
 * 表示ボタンをクリックされたとき
 */
function buttonClick() {
    //パケットの全体 (16進数)
    let num16 = inputTextElement.value.toString();

    let version = num16.substr(0, 1);//0文字目から1文字切り抜く
    console.log("version = " + version);//コンソールに確認のためのテキストを出力する
    //1文字目のバージョンによって使うテーブルを変える
    if (version == "4") {
        updateTable4();
    }
    else if (version == "6") {
        updateTable6();
    }
    else {
        updateTableError();
    }
}

//ボタンをイベントリスナーに登録する
let checkButton = document.getElementById('checkButton');
checkButton.addEventListener('click', buttonClick);

function updateTable4() {
    //隠していたテーブルを表示
    document.getElementById("table4").style.display ="block";
    document.getElementById("table6").style.display ="none";

    //パケットの全体 (16進数)
    let num16 = inputTextElement.value.toString();

    //以下からパケットの内容の解析
    //substrメソッドで切り出してそれぞれの変数に代入
    let version = num16.substr(0, 1);//0文字目から1文字切り抜く
    console.log("version = " + version);//コンソールに確認のためのテキストを出力する
    document.getElementById("version").innerHTML = genResultString(version, 4);//htmlの要素を選択し(id: version)内部のHTMLを変更する

    let headLength = num16.substr(1, 1);//1文字目から1文字切り抜く（以下同様）
    console.log("headLength = " + headLength);
    document.getElementById("headLength").innerHTML = genResultString(headLength, 4);

    let serviceType = num16.substr(2, 2);
    console.log("serviceType = " + serviceType);
    document.getElementById("serviceType").innerHTML = genResultString(serviceType, 8);

    let packetLength = num16.substr(4, 4);
    console.log("packetLength = " + packetLength);
    document.getElementById("packetLength").innerHTML = genResultString(packetLength, 16);

    let identification = num16.substr(8, 4);
    console.log("識別子 = " + identification);

    document.getElementById("identification").innerHTML = genResultString(identification, 16);

    let flags = num16.substr(12, 4);
    console.log("フラグ = " + flags);
    document.getElementById("flags").innerHTML = genResultString(flags, 16);

    let ttl = num16.substr(16, 2);
    console.log("TTL = " + ttl);
    document.getElementById("ttl").innerHTML = genResultString(ttl, 8);

    let protocol = num16.substr(18, 2);
    console.log("プロトコル番号 = " + protocol);
    document.getElementById("protocol").innerHTML = genResultString(protocol, 8);

    let headerChecksum = num16.substr(20, 4);
    console.log("ヘッダチェックサム = " + headerChecksum);
    document.getElementById("headerChecksum").innerHTML = genResultString(headerChecksum, 16);

    let srcIp = num16.substr(24, 8);
    console.log("src IP = " + srcIp + "(" + ip16toString(srcIp) + ")");
    document.getElementById("srcIp").innerHTML = srcIp + " -> " + ip16toString(srcIp);

    let dstIp = num16.substr(32, 8);
    console.log("dst IP = " + dstIp + "(" + ip16toString(dstIp) + ")");
    document.getElementById("dstIp").innerHTML = dstIp + " -> " + ip16toString(dstIp);

    let data = num16.substr(40)//40から最後まで
    document.getElementById("data").innerHTML = data;
}

function updateTable6() {
    //隠していたテーブルを表示
    document.getElementById("table6").style.display ="block";
    document.getElementById("table4").style.display ="none";

    //パケットの全体 (16進数)
    let num16 = inputTextElement.value.toString();

    //以下からパケットの内容の解析
    //substrメソッドで切り出してそれぞれの変数に代入
    let version = num16.substr(0, 1);//0文字目から1文字切り抜く
    console.log("version = " + version);//コンソールに確認のためのテキストを出力する
    document.getElementById("version6").innerHTML = genResultString(version, 4);//htmlの要素を選択し(id: version)内部のHTMLを変更する

    let trafficClass = num16.substr(1, 2);//1文字目から1文字切り抜く（以下同様）
    console.log("trafficClass = " + trafficClass);
    document.getElementById("trafficClass6").innerHTML = genResultString(trafficClass, 8);

    let flowLabel = num16.substr(3, 5);
    console.log("flowLabel = " + flowLabel);
    document.getElementById("flowLabel6").innerHTML = genResultString(flowLabel, 20);

    let payloadLength = num16.substr(8, 4);
    console.log("payloadLength = " + payloadLength);
    document.getElementById("payloadLength6").innerHTML = genResultString(payloadLength, 16);

    let nextHeader = num16.substr(12, 2);
    console.log("nextHeader = " + nextHeader);
    document.getElementById("nextHeader6").innerHTML = genResultString(nextHeader, 8);

    let hopLimit = num16.substr(14, 2);
    console.log("hopLimit = " + hopLimit);
    document.getElementById("hopLimit6").innerHTML = genResultString(hopLimit, 8);

    let srcIp = num16.substr(16, 32);
    console.log("srcIp = " + srcIp);
    document.getElementById("srcIp6").innerHTML = srcIp + "-> " + ip16toIpv6String(srcIp);

    let dstIp = num16.substr(48, 32);
    console.log("dst IP = " + dstIp);
    document.getElementById("dstIp6").innerHTML = dstIp + "-> " + ip16toIpv6String(dstIp);

    let data = num16.substr(80)//80から最後まで
    document.getElementById("data6").innerHTML = data;
}

/**
 * 16進数のStringをipv6用の表記に変換する
 * @param {*} ipv6 
 * @returns 
 */
function ip16toIpv6String(ipv6) {
    return ipv6
    .match(/.{1,4}/g)
    .map((val) => val.replace(/^0+/, ''))
    .join(':')
    .replace(/0000\:/g, ':')
    .replace(/:{2,}/g, '::')

}

/**
 * エラーを表示する
 */
function updateTableError() {
    alert("error");
}

/**
 * 入力に改行を追加し、入力の2進数版を追加したStringを生成する
 * @param {*} input パケットデータの一部
 * @param {*} length データのbit数
 * @returns 生成したString
 */
function genResultString(input, length) {
    return input + "<br>" + replace16to2(input, length);
}

/**
 * 16進数で表されたIPを10進数で分けた形に変換する
 * @param {*} ip16 16進数のIP
 * @returns 10進数の . をうった形式
 */
function ip16toString(ip16) {
    let ip2 = parseInt(ip16, 16).toString(2);
    console.log(ip2);
    let s1 = parseInt(ip2.substring(0, 8), 2);
    let s2 = parseInt(ip2.substring(8, 16), 2);
    let s3 = parseInt(ip2.substring(16, 24), 2);
    let s4 = parseInt(ip2.substring(24, 32), 2);
    return s1 + "." + s2 + "." + s3 + "." + s4;
}

/**
 * 16進数のStringから指定した桁数でゼロ埋めした2進数のStringに変換する
 * @param {*} text16 16進数のテキスト
 * @param {*} length 桁数(0埋めするため)
 * @returns ゼロ埋めした2進数
 */
function replace16to2(text16, length) {
    let num10 = parseInt(text16, 16);//10進数
    let num2 = num10.toString(2)//2進数
    return num2.padStart(length, '0');//ゼロ埋め
}
