var googleDocIDPage="1";
   var googleDocIDPage2="2";

function chooseCardDeck() {
    var cardDeckToUSe = document.getElementById("cardInput").value;

    switch(cardDeckToUSe) {
        case "Physics":
        googleDocIDPage = "1";
        break;
        case "History":
        googleDocIDPage = "2";
        break;
        case "Art":
        googleDocIDPage = "3";
        break;
        case "Anatomy":
        googleDocIDPage = "4";
        break;
        default:
        googleDocIDPage = "1";
    }
listOfItems=[];
        document.getElementById("cardDeckMain").innerHTML="";
  
  
var CardCounter=0;
const CARD_PEN_OFFSET = 10, //displacement of the cards
      CARD_SWITCH_RANGE = '130%';
 var readyFunction=false;

 var listOfItems=[];
  var googleDocID="1Hy4L8tVHVRBFPykqgVmohY1Ir6BFw0LTUS6qH25prtk";
  

  var spreadsheetID = "1k0s6szGPTvNYi3u5DxUH_Y0RozTjFUA0D5LKmZmbODI";



// Make sure it is public or set to Anyone with link can view 

    var url = "https://spreadsheets.google.com/feeds/list/" + googleDocID + "/" + googleDocIDPage + "/public/values?alt=json";
	var url2 = "https://spreadsheets.google.com/feeds/list/" + googleDocID + "/" + googleDocIDPage2 + "/public/values?alt=json";



	var request = new XMLHttpRequest();
	request.open('GET', url, true);

	request.onload = function() {
	if (request.status >= 200 && request.status < 400) {
    // Success!
    var data = JSON.parse(request.responseText);
	var entry = data.feed.entry;
	//console.log(entry);
	var entrylength = entry.length;
		
	
	for(g=0;g<entrylength;g++){
	
	tempArray=[entry[g].gsx$flashcardfront.$t,entry[g].gsx$flashcardback.$t,entry[g].gsx$flashcardfrontimage.$t,entry[g].gsx$flashcardbackimage.$t];
	//console.log(tempArray);
	listOfItems.push(tempArray);
	
	
	}
	
	console.log(listOfItems);
	
   createDivsFunction();
  
   //return readyFunction=true;
     hideImages();
    
   const CARD_ARRAY = [...document.querySelectorAll('div[class*="containers"]')];
/* Do not change this */
const COUNT_OF_CARDS = CARD_ARRAY.length;
let last_element = CARD_ARRAY[CARD_ARRAY.length - 1];
let isMoving = false;


let offsetArray = [], offset = 0, l = CARD_ARRAY.length;
for (let i = 1; i <= l; i++) {
  offsetArray.push(offset);
  offset += CARD_PEN_OFFSET;
}

setCardOffset();
function setCardOffset() {
  CARD_ARRAY.forEach(function(item, index){
    item.style.zIndex = Math.abs(index - COUNT_OF_CARDS);
    item.style.transform = `translate(${offsetArray[index]}px, ${offsetArray[index]}px)`;
  });
}

var cardDeckSize=document.getElementsByClassName("container").length;
cardDeckSizeA=cardDeckSize-1;

   /******************************************************************/
window.addEventListener('wheel', function(e){cardSwitching(e);});
window.addEventListener('keydown', function(e){cardSwitching(e);});

function cardSwitching(e) {
  let animationObject = {}, previousSibling, scrolling = '';

  /* return when you scroll during the animation of a card */
  if ((scrolling === 'up') || (scrolling === 'down') || (isMoving)) return;

  if ((e.keyCode !== 38 && e.keyCode !== 40) && (e.keyCode !== undefined)) return;

  for (let index of CARD_ARRAY) {
    if ((parseInt(window.getComputedStyle(index).zIndex) === CARD_ARRAY.length) || (parseInt(index.style.zIndex) === CARD_ARRAY.length)) {

      /*switch the rearmost card */
      if (e.deltaY < 0 || e.keyCode === 38) { //deltaY < 0 -> scrolling up
        previousSibling = index.previousElementSibling;
        if (previousSibling === null) previousSibling = last_element;
      }

      animationObject = e.deltaY < 0 || e.keyCode === 38 ? previousSibling : e.deltaY > 0 || e.keyCode === 40 ? index : '';
      animationObject.style.transform = `translate(0px, -${CARD_SWITCH_RANGE})`;
      scrolling = e.deltaY < 0 || e.keyCode === 38 ? 'up' : e.deltaY > 0 || e.keyCode === 40 ? 'down' : '';
      isMoving = true;
    }
  }

  if (animationObject !== undefined) {
    animationObject.addEventListener('transitionend', function(){
      if (scrolling === 'down') {
        animationObject.style.zIndex = 0;
        animationObject.style.transform = `translate(${offsetArray[COUNT_OF_CARDS]}px, ${offsetArray[COUNT_OF_CARDS]}px)`;
        offsetSwitch(scrolling);
        CardCounter++;
        if(CardCounter>cardDeckSizeA){
           CardCounter=0;
           }
      }

      else if (scrolling === 'up'){
        offsetSwitch(scrolling);
        animationObject.style.zIndex = COUNT_OF_CARDS;
        animationObject.style.transform = `translate(0px, 0px)`;
        
         CardCounter--;
        if(CardCounter<0){
           CardCounter=cardDeckSizeA;
           }
       
      }
      scrolling = '';
    }, {once: true });
  }
}

function offsetSwitch(scrolling) {
  for (let index of CARD_ARRAY) {
    index.style.zIndex = scrolling === 'down' ? parseInt(index.style.zIndex) + 1 : parseInt(index.style.zIndex) - 1;
    let offsetIndex = Math.abs(parseInt(index.style.zIndex) - COUNT_OF_CARDS);
    index.style.transform = `translate(${offsetArray[offsetIndex]}px, ${offsetArray[offsetIndex]}px)`;

    index.addEventListener('transitionend', () => isMoving = false, {once: true });
  }
}


$('.container').on('click', function () {
  $(`.card:eq(${CardCounter})`).toggleClass('flipped');
});

	
	
  } else {
    // We reached our target server, but it returned an error

  }
};

request.onerror = function() {
  // There was a connection error of some sort
};

request.send();


 function createDivsFunction(){
   for(y=0;y<listOfItems.length;y++){
    tempTextItem= listOfItems[y];
     
     var cardID="cardNumber"+y;
     var imageID1="imageNumber"+y +"i1";
     var imageID2="imageNumber"+ y +"i2";
     
     document.getElementById("cardDeckMain").innerHTML +=
      '<div class="container containers first" id="'+ cardID+ '"><div class="card"><div class="front"><p>'+tempTextItem[0]+'</p><p></p><img id="'+imageID1+'" src="'+tempTextItem[2]+'"  width="200"></div><div class="back"><p>'+tempTextItem[1]+'</p><p></p><img id="'+imageID2+'" src="'+tempTextItem[3]+'"width="200"></div></div></div>';
     
   }
   
 }
  

 function hideImages(){
   for(w=0;w<listOfItems.length;w++){
    tempTextItem= listOfItems[w];
     
     var findcardID="cardNumber"+w;
     var findimageID1="imageNumber"+w +"i1";
     var findimageID2="imageNumber"+ w +"i2";
     
 if(tempTextItem[2]===""){
     document.getElementById(findimageID1).classList.add("imageHide");
   }
     
   else{
         document.getElementById(findimageID1).classList.add("imageShow");
     
     
     
   }
     
     
if(tempTextItem[3]===""){
   document.getElementById(findimageID2).classList.add("imageHide");
   }     
   
   else{
   document.getElementById(findimageID2).classList.add("imageShow");
   
   }
   }
   }
   



//https://docs.google.com/spreadsheets/d/1Hy4L8tVHVRBFPykqgVmohY1Ir6BFw0LTUS6qH25prtk/edit?usp=sharing

}



  
