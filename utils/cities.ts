// utils/cities.ts
// Lista completă orașe România grupate pe județe
// sursa: INS, Wikipedia, listă localități oficiale

const cities: Record<string, string[]> = {
  "Alba": [
    "Alba Iulia", "Aiud", "Blaj", "Cugir", "Ocna Mureș", "Sebeș", "Teiuș", "Zlatna", "Abrud", "Baia de Arieș", "Câmpeni"
  ],
  "Arad": [
    "Arad", "Chișineu-Criș", "Curtici", "Ineu", "Lipova", "Nădlac", "Pâncota", "Pecica", "Sântana", "Sebis"
  ],
  "Argeș": [
    "Pitești", "Câmpulung", "Curtea de Argeș", "Costești", "Mioveni", "Ștefănești", "Topoloveni"
  ],
  "Bacău": [
    "Bacău", "Buhuși", "Comănești", "Dărmănești", "Moinești", "Onești", "Slănic-Moldova", "Târgu Ocna"
  ],
  "Bihor": [
    "Oradea", "Aleșd", "Beiuș", "Marghita", "Nucet", "Salonta", "Ștei", "Vașcău"
  ],
  "Bistrița-Năsăud": [
    "Bistrița", "Beclean", "Năsăud", "Sângeorz-Băi"
  ],
  "Botoșani": [
    "Botoșani", "Bucecea", "Darabani", "Dorohoi", "Flămânzi", "Săveni", "Ștefănești"
  ],
  "Brașov": [
    "Brașov", "Codlea", "Făgăraș", "Ghimbav", "Predeal", "Râșnov", "Rupea", "Săcele", "Victoria", "Zărnești"
  ],
  "Brăila": [
    "Brăila", "Făurei", "Ianca", "Însurăței"
  ],
  "București": [
    "București"
  ],
  "Buzău": [
    "Buzău", "Nehoiu", "Pătârlagele", "Pogoanele", "Râmnicu Sărat"
  ],
  "Caraș-Severin": [
    "Reșița", "Anina", "Băile Herculane", "Bocșa", "Caransebeș", "Moldova Nouă", "Oravița", "Oțelu Roșu"
  ],
  "Călărași": [
    "Călărași", "Budești", "Fundulea", "Lehliu-Gară", "Oltenița"
  ],
  "Cluj": [
    "Cluj-Napoca", "Câmpia Turzii", "Dej", "Gherla", "Huedin", "Turda"
  ],
  "Constanța": [
    "Constanța", "Băneasa", "Cernavodă", "Eforie", "Hârșova", "Mangalia", "Medgidia", "Murfatlar", "Negru Vodă", "Năvodari", "Ovidiu", "Techirghiol"
  ],
  "Covasna": [
    "Sfântu Gheorghe", "Baraolt", "Covasna", "Întorsura Buzăului", "Târgu Secuiesc"
  ],
  "Dâmbovița": [
    "Târgoviște", "Fieni", "Găești", "Moreni", "Pucioasa", "Răcari", "Titu"
  ],
  "Dolj": [
    "Craiova", "Bechet", "Calafat", "Băilești", "Dăbuleni", "Filiași", "Segarcea"
  ],
  "Galați": [
    "Galați", "Berești", "Târgu Bujor", "Tecuci"
  ],
  "Giurgiu": [
    "Giurgiu", "Bolintin-Vale", "Mihăilești"
  ],
  "Gorj": [
    "Târgu Jiu", "Bumbești-Jiu", "Motru", "Novaci", "Rovinari", "Târgu Cărbunești", "Țicleni", "Tismana", "Turceni"
  ],
  "Harghita": [
    "Miercurea Ciuc", "Băile Tușnad", "Bălan", "Borsec", "Cristuru Secuiesc", "Gheorgheni", "Odorheiu Secuiesc", "Toplița", "Vlăhița"
  ],
  "Hunedoara": [
    "Deva", "Brad", "Călan", "Geoagiu", "Hațeg", "Hunedoara", "Lupeni", "Orăștie", "Petrila", "Petroșani", "Simeria", "Uricani", "Vulcan"
  ],
  "Ialomița": [
    "Slobozia", "Amara", "Căzănești", "Fetești", "Fierbinți-Târg", "Țăndărei", "Urziceni"
  ],
  "Iași": [
    "Iași", "Hârlău", "Pașcani", "Podu Iloaiei", "Târgu Frumos"
  ],
  "Ilfov": [
    "Buftea", "Chitila", "Măgurele", "Otopeni", "Pantelimon", "Popești-Leordeni", "Voluntari", "Bragadiru"
  ],
  "Maramureș": [
    "Baia Mare", "Baia Sprie", "Borșa", "Cavnic", "Dragomirești", "Săliștea de Sus", "Seini", "Sighetu Marmației", "Tăuții-Măgherăuș", "Târgu Lăpuș", "Ulmeni", "Vișeu de Sus"
  ],
  "Mehedinți": [
    "Drobeta-Turnu Severin", "Baia de Aramă", "Orșova", "Strehaia", "Vânju Mare"
  ],
  "Mureș": [
    "Târgu Mureș", "Iernut", "Luduș", "Miercurea Nirajului", "Reghin", "Sărmașu", "Sovata", "Sângeorgiu de Pădure", "Sighișoara", "Ungheni"
  ],
  "Neamț": [
    "Piatra Neamț", "Bicaz", "Roman", "Roznov", "Târgu Neamț"
  ],
  "Olt": [
    "Slatina", "Balș", "Corabia", "Drăgănești-Olt", "Piatra-Olt", "Potcoava", "Scornicești"
  ],
  "Prahova": [
    "Ploiești", "Azuga", "Băicoi", "Boldești-Scăeni", "Breaza", "Bușteni", "Comarnic", "Mizil", "Plopeni", "Sinaia", "Slănic", "Urlați", "Vălenii de Munte"
  ],
  "Satu Mare": [
    "Satu Mare", "Ardud", "Carei", "Livada", "Negrești-Oaș", "Tășnad"
  ],
  "Sălaj": [
    "Zalău", "Cehu Silvaniei", "Jibou", "Șimleu Silvaniei"
  ],
  "Sibiu": [
    "Sibiu", "Agnita", "Avrig", "Cisnădie", "Copșa Mică", "Dumbrăveni", "Mediaș", "Miercurea Sibiului", "Ocna Sibiului", "Săliște", "Tălmaciu"
  ],
  "Suceava": [
    "Suceava", "Broșteni", "Cajvana", "Câmpulung Moldovenesc", "Dolhasca", "Fălticeni", "Frasin", "Gura Humorului", "Liteni", "Milișăuți", "Rădăuți", "Salcea", "Siret", "Solca", "Vicovu de Sus", "Vatra Dornei"
  ],
  "Teleorman": [
    "Alexandria", "Roșiorii de Vede", "Turnu Măgurele", "Videle", "Zimnicea"
  ],
  "Timiș": [
    "Timișoara", "Buziaș", "Ciacova", "Deta", "Făget", "Gătaia", "Jimbolia", "Lugoj", "Recaș", "Sânnicolau Mare"
  ],
  "Tulcea": [
    "Tulcea", "Babadag", "Isaccea", "Măcin", "Sulina"
  ],
  "Vaslui": [
    "Vaslui", "Bârlad", "Huși", "Negrești", "Murgeni"
  ],
  "Vâlcea": [
    "Râmnicu Vâlcea", "Băbeni", "Băile Govora", "Băile Olănești", "Berbești", "Brezoi", "Călimănești", "Drăgășani", "Horezu", "Ocnele Mari"
  ],
  "Vrancea": [
    "Focșani", "Adjud", "Mărășești", "Odobești", "Panciu"
  ]
};

export default cities;
