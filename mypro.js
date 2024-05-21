function generateID() {
    var count = 1000;
    return function () {
      return count++;
    };
  }
  
  // extracted the inner function in a variable called id
  var id = generateID();
function makeMusic(artist,musictitle,duration,imageCover,source,category){
    return {
        id:id(),
        artist : artist ,
        musictitle : musictitle,
        duration : duration,
        imageCover : imageCover ,
        source : source,
        category : category,
        likes : 0
       
    }
}

var music1 = makeMusic('Kendrick Lamar', 'Meet The Grahams', '6:00 min' , ['https://upload.wikimedia.org/wikipedia/en/e/e5/Kendrick_Lamar_-_Meet_the_Grahams.jpg'],["/meet the grahams.mp3"],'rap')
var music2 = makeMusic('Caleborate' , '4 Willem' , '4:30 min', ['https://i1.sndcdn.com/artworks-000338572779-bcssvw-t240x240.jpg'],['/meet the grahams.mp3'],'rap')
var music3 = makeMusic('nas', 'Meet ', '6:00 min' , ['https://upload.wikimedia.org/wikipedia/en/e/e5/Kendrick_Lamar_-_Meet_the_Grahams.jpg'],['/meet the grahams.mp3'],'rap')
var music4 = makeMusic('Caleborate' , '4 Willem' , '4:30 min', ['https://i1.sndcdn.com/artworks-000338572779-bcssvw-t240x240.jpg'],['/meet the grahams.mp3'],'rap')
var music5 = makeMusic('Caleborate' , '4 Willem' , '4:30 min', ['https://i1.sndcdn.com/artworks-000338572779-bcssvw-t240x240.jpg'],['/meet the grahams.mp3'],'rap')
// var cont = $("<div class = 'musiccontainer'></div>")
// var cont2 = $("<div></div>").addClass("imageContainer")
// cont2.html(`<img src=${music1.imageCover[0]}  /><audio src="./mamalik.mp3" controls ></audio>`)
// cont.append(cont2)

// var detailCont = $("<div class = 'detail container'></div>")
//      $(`<h2>${music1.musictitle} by ${music1.artist}</h2>`).appendTo(detailCont)
//      $(`<p>${music1.duration}</p>`).appendTo(detailCont)
//      $(`<p>${music1.category}</p>`).appendTo(detailCont)
//      cont.append(detailCont)
//      cont.append(detailCont)
    //  $('#motherDiv').append(cont)


class myMusic{
    constructor (){
        this.list = []
        this.likes = 0
    }
    addMusic(newMusic){
       this.list.push(newMusic)
    }
    removeMusic (trackName){
        if(this.list.length === 0){
            return 'The List Is Empty'
        }
        for (var i = 0 ; i < this.list.length ; i++){
            if (this.list[i].musictitle===trackName){
                this.list.splice(i, 1);
                return `Removed ${trackName} from the list`;
            }
        }    
        return "Couldn't find the trackname " 
    }
    search(){
          var arr = []
       var word =$('#searchinp').val() 
       console.log(word,'searchword');
        var low = word.toLowerCase()
        if (word.length < 3){
            return 'please tap at least 4 char'
        }
        for (var i = 0 ; i <this.list.length ; i++){
            var low2 = this.list[i].artist.toLowerCase()
            var low3 = this.list[i].musictitle.toLowerCase()
            if (low2.includes(low)||low3.includes(low)){
                   arr.push(this.list[i])
                   $('#motherDiv').empty()
                  for (let i = 0; i < arr.length; i++) {
                    const element = arr[i]; 
                    display (element)
                    
                  }
               
            }
            
        }
        return 'no result'
    }
    likeMusic(id) {
        for (var i = 0; i < this.list.length; i++) {
            if (this.list[i].id === id) {
                this.list[i].likes++;
                // $('.like-button')[i].val('Liked')
                console.log(this.list[i].likes);
                $(`.like-counter${id}`).text(this.list[i].likes)
                 $(`.like-button${id}`).text('Liked')

                // return `Liked ${trackName}`;
            }
        }
        return "Couldn't find the trackname ";
    }
    sortByCategory(){
        this.list.sort(function (a, b) {
             return a.category - b.category;
    })
    }}
//     sortByDate(){
//         this.list.sort(function (a, b) {
//             return a.date - b.date;
//     })
// }

     

function display (music) {
    var cont = $("<div class = 'musiccontainer'></div>")
var cont2 = $("<div></div>").addClass("imageContainer")
cont2.html(`<img src=${music.imageCover[0]}  /><audio src="${music.source[0]}" controls ></audio>`)
cont.append(cont2)

var detailCont = $("<div class = 'detail container'></div>")
$(`<h2>${music.musictitle} by ${music.artist}</h2>`).appendTo(detailCont)
$(`<p>${music.duration}</p>`).appendTo(detailCont)
$(`<p>${music.category}</p>`).appendTo(detailCont)
var likeButton = $(`<button class='like-button${music.id}'  onclick="musicTime.likeMusic(${music.id})">Like</button>`)
var likeCounter = $(`<p class='like-counter${music.id}'>${music.likes}</p>`)
console.log(likeCounter);
console.log(likeButton);
detailCont.append(likeButton)
detailCont.append(likeCounter)
cont.append(detailCont)
cont.append(detailCont)
$('#motherDiv').append(cont)
}


var musicTime = new myMusic()
musicTime.addMusic(music1)
musicTime.addMusic(music2)
musicTime.addMusic(music3)
musicTime.addMusic(music4)
musicTime.addMusic(music5)

function displayall (musicTime){
    for ( var i = 0 ; i <musicTime.list.length ; i++){
        display(musicTime.list[i])
    }
}
displayall(musicTime)

$('#searchbutt').click(function(){
    musicTime.search()
})
$('.like-button').click(function(){
    musicTime.likeMusic()
console.log(musicTime.list);
})