const { fifaData } = require("./fifa.js");

/* Görev 1: 
	Verilen datayı parçalayarak aşağıdaki verileri (console.log-ing) elde ederek pratik yapın. 
	
	💡 İPUCU: Öncelikle datayı filtrelemek isteyebilirsiniz */

//(a) 2014 Dünya kupası Finali Evsahibi takım ismi (dizide "Home Team Name" anahtarı)

const final2014 = fifaData.find(
  (item) => item.Year === 2014 && item.Stage === "Final"
);
//console.log(final2014["Home Team Name"]);
//(b) 2014 Dünya kupası Finali Deplasman takım ismi  (dizide "Away Team Name" anahtarı)
//console.log(final2014["Away Team Name"]);
//(c) 2014 Dünya kupası finali Ev sahibi takım golleri (dizide "Home Team Goals" anahtarı)
//console.log(final2014["Home Team Goals"]);
//(d)2014 Dünya kupası finali Deplasman takım golleri  (dizide "Away Team Goals" anahtarı)
//console.log(final2014["Away Team Goals"]);
//(e) 2014 Dünya kupası finali kazananı*/

let winner = "";
if (final2014["Home Team Goals"] > final2014["Away Team Goals"]) {
  winner = final2014["Home Team Name"];
} else {
  winner = final2014["Away Team Name"];
}
/*  Görev 2: 
	Finaller adlı fonksiyonu kullanarak aşağıdakileri uygulayın:
	1. Bir dizi(array) olan Fifa datasını fonksiyonun birinci parametresi olarak alacak
	2. Sadece final maçlarını içeren nesnenin(object) datalarını filtreleyerek, bir dizi olarak döndürecek(return)
	
	💡 İPUCU - verilen data içindeki nesnelerin(objects) "Stage" anahtarına bakmalısınız
*/

function Finaller(arr) {
  /* kodlar buraya */
  const finalMatches = arr.filter((match) => match.Stage == "Final");
  return finalMatches;
}
//console.log("son", Finaller(fifaData));

/*  Görev 3: 
	Bir higher-order fonksiyonu olan Yillar isimli fonksiyona aşağıdakileri uygulayın: 
	1. fifaData dizisini(array) fonksiyonun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Finaller data setindeki tüm yılları içeren "years" adındaki diziyi(array) döndürecek
	*/

function Yillar(arr, callback) {
  /* kodlar buraya */
  const finaller = callback(arr);
  const years = finaller.map((year) => year.Year);
  return years;
}
//console.log(Yillar(fifaData, Finaller));

/*  Görev 4: 
	Bir higher-order fonksiyonunu olan Kazananlar isimli fonksiyona aşağıdakileri uygulayın:  
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Her final maçının kazananını (evsahibi ya da deplasman) belirleyecek
	💡 İPUCU: Beraberlikler(ties) için şimdilik endişelenmeyin (Detaylı bilgi için README dosyasına bakabilirsiniz.)
	4. Tüm kazanan ülkelerin isimlerini içeren `kazananlar` adında bir dizi(array) döndürecek(return)  */

function Kazananlar(arr, callback) {
  /* kodlar buraya */
  const finaller = callback(arr);
  const winners = finaller.map((win) => {
    return win["Home Team Goals"] > win["Away Team Goals"]
      ? win["Home Team Name"]
      : win["Away Team Name"];
  });
  /* const kazanlar=finaller.reduce((total,win)=>{
if(win["Home Team Goals"] > win["Away Team Goals"]){
	total.push(win["Home Team Name"])
}else{total.push(win["Away Team Name"]}
  return total}
  ,[]) */
  return winners;
}
//console.log("aaa", Kazananlar(fifaData, Finaller));

/*  Görev 5: 
	Bir higher-order fonksiyonu olan YillaraGoreKazananlar isimli fonksiyona aşağıdakileri uygulayın:
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Görev 3'de yazdığınız Yillar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun üçüncü parametresi olarak alacak
	4. Görev 4'de yazdığınız Kazananlar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun dördüncü parametresi olarak alacak
	5. Her yıl için "{yıl} yılında, {ülke} dünya kupasını kazandı!" cümlesini(string) içeren bir diziyi(array) döndürecek
	
	💡 İPUCU: her cümlenin adım 4'te belirtilen cümleyle birebir aynı olması gerekmektedir.
*/

function YillaraGoreKazananlar(
  arr,
  callbackFinal,
  callbackYil,
  callbackKazanlar
) {
  /* kodlar buraya */
  const years = callbackYil(arr, callbackFinal);
  const winners = callbackKazanlar(arr, callbackFinal);
  const champs = years.map(
    (year, index) =>
      `${year} yılında, ${winners[index]} dünya kupasını kazandı!`
  );
  return champs;
}
//console.log(YillaraGoreKazananlar(fifaData, Finaller, Yillar, Kazananlar));

/*  Görev 6: 
	Bir higher order fonksiyonu olan `OrtalamaGolSayisi` isimli fonksiyona aşağıdakileri uygulayın: 
	1. Görev 2'de yazdığınız `Finaller` fonksiyonunu birinci parametre olarak alacak;
	 'fifaData' dizisini argüman olarak eklediğinizden emin olun
	
	💡 İPUCU: Çağırma örneği: `OrtalamaGolSayisi(Finaller(fifaData));`
	
	2. Her maç için Ortalama toplam evsahibi gol sayısı ve toplam deplasman gol sayısını hesaplayacak 
	(her maçta atılan toplam gol sayısı)
	
	3. Sonucun 2. ondalığını yuvarlayıp, bulunan değeri döndürecek(return)
	
	💡 İPUCU: .reduce, .toFixed (dizilim(syntax) için MDN'ye bakın) kullan, ve bunu 2 adımda yapın) 
	
*/
function OrtalamaGolSayisi(finalData) {
  /* kodlar buraya */
  const macSayisi = finalData.length;
  const toplamGol = finalData.reduce((total, mac) => {
    return total + mac["Home Team Goals"] + mac["Away Team Goals"];
  }, 0);
  const ortalama = toplamGol / macSayisi;

  return ortalama.toFixed(2);
}
//console.log(OrtalamaGolSayisi(Finaller(fifaData)));

/// EKSTRA ÇALIŞMALAR ///

/*  BONUS 1:  
	`UlkelerinKazanmaSayilari` isminde bir fonksiyon oluşturun, parametre olarak `data` ve `takım kısaltmalarını` 
	alacak ve hangi ülkenin kaç dünya kupası olduğunu döndürecek
	
	İpucu: "takım kısaltmaları" (team initials) için datada araştırma yapın!
İpucu: `.reduce` Kullanın*/
function Kazanan(arr, callback) {
  /* kodlar buraya */
  const finaller = callback(arr);
  const winners = finaller.map((win) => {
    return win["Home Team Goals"] > win["Away Team Goals"]
      ? win["Home Team Initials"]
      : win["Away Team Initials"];
  });
  /* const kazanlar=finaller.reduce((total,win)=>{
if(win["Home Team Goals"] > win["Away Team Goals"]){
	total.push(win["Home Team Name"])
}else{total.push(win["Away Team Name"]}
  return total}
  ,[]) */
  return winners;
}

function UlkelerinKazanmaSayilari(data) {
  /* kodlar buraya */
  let sonuc = {};
  for (let i = 0; i < data.length; i++) {
    if (sonuc[data[i]] == undefined) {
      sonuc[data[i]] = 1;
    } else {
      sonuc[data[i]] += 1;
    }
  }
  return sonuc;
}
//console.log(UlkelerinKazanmaSayilari(Kazanan(fifaData, Finaller)));

/*  BONUS 2:  
EnCokGolAtan() isminde bir fonksiyon yazın, `data` yı parametre olarak alsın ve 
Dünya kupası finallerinde en çok gol atan takımı döndürsün */

function EnCokGolAtan(Finaller, arr) {
  /* kodlar buraya */
  let finaller = Finaller(arr);
  let teams = {};
  finaller.forEach((item) => {
    if (teams[item["Home Team Initials"]] == undefined) {
      teams[item["Home Team Initials"]] = item["Home Team Goals"];
    } else {
      teams[item["Home Team Initials"]] += item["Home Team Goals"];
    }
    if (teams[item["Away Team Initials"]] == undefined) {
      teams[item["Away Team Initials"]] = item["Away Team Goals"];
    } else {
      teams[item["Away Team Initials"]] += item["Away Team Goals"];
    }
  });
  return teams;
}
//console.log(EnCokGolAtan(Finaller, fifaData));

/*  BONUS 3: 
EnKotuDefans() adında bir fonksiyon yazın, `data` yı parametre olarak alsın ve
 Dünya kupasında finallerinde en çok golü yiyen takımı döndürsün*/

function EnKotuDefans(Finaller, arr) {
  /* kodlar buraya */
  let finaller = Finaller(arr);
  let teams = {};
  finaller.forEach((item) => {
    if (teams[item["Home Team Initials"]] == undefined) {
      teams[item["Home Team Initials"]] = item["Away Team Goals"];
    } else {
      teams[item["Home Team Initials"]] += item["Away Team Goals"];
    }
    if (teams[item["Away Team Initials"]] == undefined) {
      teams[item["Away Team Initials"]] = item["Home Team Goals"];
    } else {
      teams[item["Away Team Initials"]] += item["Home Team Goals"];
    }
  });
  let max = 0;
  let team = "";
  for (let key in teams) {
    if (teams[key] > max) {
      max = teams[key];
      team = key;
    }
  }
  let metin = `Dünya kupası finallerinde en çok gol yiyen takım ${max} golle ${team}!.`;
  return metin;
}
//console.log(EnKotuDefans(Finaller, fifaData));

/* Hala vaktiniz varsa, README dosyasında listelenen hedeflerden istediğinizi aşağıdaki boşluğa yazabilirsiniz. */

/* Bu satırın aşağısındaki kodları lütfen değiştirmeyin */
function sa() {
  console.log("Kodlar çalışıyor");
  return "as";
}
sa();
module.exports = {
  sa,
  Finaller,
  Yillar,
  Kazananlar,
  YillaraGoreKazananlar,
  OrtalamaGolSayisi,
};
