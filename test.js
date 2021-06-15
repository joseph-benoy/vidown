var str = "സ്‌കേറ്റര്‍ ഗേള്‍: സ്വാതന്ത്ര്യത്തിന്റെ ലോകത്ത് പറക്കാന്‍ ആഗ്രഹിക്കുന്നവരുടെ കഥ";
var combining = /[\u0300-\u036F]/g; 

console.log(str.normalize('NFKD').replace(combining, ''));