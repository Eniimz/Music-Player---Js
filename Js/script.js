let wrapper = document.querySelector(".wrapper");
let threedotsicon = wrapper.querySelector(".top-bar .three-dots-icon span");
let threeDOtsBox = wrapper.querySelector(".three-dots-box");
let threeDOtsBoxBtn = wrapper.querySelector(".three-dots-box input");
let AddSongBtn = wrapper.querySelector(".three-dots-box button");
let songname= wrapper.querySelector(".song-details .song-name");
let songartist = wrapper.querySelector(".song-details .lib");
let cover = wrapper.querySelector(".image-section .song-cover");
let mainaudio = wrapper.querySelector(".main-audio");
let playpausebtn = wrapper.querySelector(".play-pause");
let allli = wrapper .querySelectorAll(".songs ul li");
const musiclib = wrapper.querySelector(".controls .lib-music");
const musiclist = wrapper.querySelector(".music-list");
let closeicon = wrapper.querySelector(".header-music-list i span");
let iconchange = wrapper.querySelector(".play-pause span");
let nextbtn = wrapper.querySelector(".controls .next span");
let prevbtn = wrapper.querySelector(".controls .previous span");
let progressbar = wrapper.querySelector(".progress-bar");
let progressArea = wrapper.querySelector(".progress-bar-area");
let currentTimer = wrapper.querySelector(".timer .current-time");
let duration = wrapper.querySelector(".end-time");
let repeatbtn = wrapper.querySelector(".repeat span");
let file_input = wrapper.querySelector(".file-input");

let flag = 0;

let songindex = 0;

window.addEventListener("load", (event)=>{
    
    loadsongs(songindex);
    
});
/*
const selectedfile = (e)=> {

    const file = e.target.files[0];

    if (file && (file.type === "audio/mp3" || file.type === "audio/mpeg" || file.type === "audio/x-mpeg-3"))
    {
        console.log("file is mp3");

    }
    else
    {
        console.log("file is not mp3");
        file_input.value = "";

    }
}*/

//loading user mp3 file



file_input.addEventListener("change", (event) => {
    let selectedfile = event.target.files[0];

    if (selectedfile.type === "audio/mpeg" || selectedfile.type === "audio/mp3" )
    {

        flag = 1;
        filepath = file_input.value;
        console.log("file is mp3");
        reader = new FileReader();

        reader.onload =function()
        {
            let mp3file = {
                name: selectedfile.name,
                artist: "unknown artist",
                img: "",
                src: reader.result
            }

            
            allsongs.push(mp3file);
            loadsongs(allsongs.length - 1);
            update_musiclibrary();
            
        }


        console.log(allsongs);
        
        reader.readAsDataURL(selectedfile);
        
    }
    else
    {

        console.log("file not mp3");

    }
});

function update_musiclibrary() {
    let songs = wrapper.querySelector(".songs ul");
    songs.innerHTML = "";

   allsongs.forEach((song, index) => {

    let li = document.createElement("li");
    li.innerHTML = `

    <div class="song">
      <div class="details">
       <p class ="name-artist">${song.name} - ${song.artist}</p>
       <span class="production">Audio Library</span>
      </div>
      <p class="audio-duration">3:40</p>
    </div>
 
    `;

  

   li.addEventListener("click", () => {


    
    loadsongs(index);
    songindex = index;
    mainaudio.play();
    playpausebtn.classList.add("active");
    iconchange.innerText = "pause";

   });
    
   songs.appendChild(li);

});


  

}




document.addEventListener("click", (event)=> {

    if ((event.target != ".file-input" || event.target != ".three-dots-box") && wrapper.classList.contains("active"))
    {
        if (!(threedotsicon.contains(event.target)))
        {
            threeDOtsBox.style.display = "none";
        }
    }



});

AddSongBtn.addEventListener("click", ()=> {
    threeDOtsBoxBtn.click();
})

threedotsicon.addEventListener("click", ()=> {
    threeDOtsBox.style.display = "block";
    wrapper.classList.add("active");
})


function loadsongs(songindex){
    songname.innerText = allsongs[songindex].name;
    songartist.innerText = allsongs[songindex].artist;
    cover.src = `images/${allsongs[songindex].img}.jpg`;
    mainaudio.src = `songs/${allsongs[songindex].src}.mp3`;

}








nextbtn.addEventListener("click",  ()=> {
    songindex++;
    songindex >= allsongs.length ? songindex = 0 : songindex = songindex;
    loadsongs(songindex);
    iconchange.innerText = "pause";
    playpausebtn.classList.add("active");
    mainaudio.play();
})

prevbtn.addEventListener("click",  ()=> {
    songindex--;
    songindex < 0 ? songindex = allsongs.length - 1 : songindex = songindex;
    loadsongs(songindex);
    iconchange.innerText = "pause";
    playpausebtn.classList.add("active");
    mainaudio.play();
})

function playmusic(){
    playpausebtn.classList.add("active");
    iconchange.innerText = "pause";
         
    mainaudio.play();

}

function pausemusic(){
    playpausebtn.classList.remove("active");
    iconchange.innerText = "play_arrow";
    mainaudio.pause();
}




playpausebtn.addEventListener("click", ()=>{

    let isactive = playpausebtn.classList.contains("active");
    isactive ? pausemusic() : playmusic();

});



closeicon.addEventListener("click", ()=> {
    musiclist.classList.remove("show");
})

musiclib.addEventListener("click", ()=> {
    
    musiclist.classList.add("show");

});


for (let i = 0; i < allsongs.length; i++ )
{
    
    let li = allli[i];
    li.addEventListener("click", ()=> {
        loadsongs(i);
        songindex = i;
        mainaudio.play();
        playpausebtn.classList.add("active");
        iconchange.innerText = "pause";
    });

}

for (let i = 0; i < allsongs.length; i++)
{
    
    allli.forEach((liel, index)=> {

        if (index == i)
        {
        var songnamelist = liel.querySelector(".details .name-artist");
        var songartistlist = liel.querySelector(".details .production");
        songnamelist.innerText = allsongs[i].name;
        songartistlist.innerText = allsongs[i].artist;
        }
    });

}

mainaudio.addEventListener("timeupdate", (e)=> {

    let currenttime = e.target.currentTime;
    let audioduration = e.target.duration;
    
    let ProgressbarWidth = (currenttime/audioduration)*100;
    progressbar.style.width = `${ProgressbarWidth}%`;


    mainaudio.addEventListener("loadeddata", ()=> {

    let audioduration = mainaudio.duration;    
    let totalMin = Math.floor(audioduration / 60);
    let totalSec = Math.floor(audioduration % 60);
    duration.innerText = `${totalMin} : ${totalSec}`;

    if (totalSec < 10)
    {
        duration.innerText = `${totalMin} : 0${totalSec}`;
    }

    });
       
    let totalMin = Math.floor(currenttime / 60);
    let totalSec = Math.floor(currenttime % 60);
    currentTimer.innerText = `${totalMin} : ${totalSec}`;

   if (totalSec < 10)
    {
        currentTimer.innerText = `${totalMin} : 0${totalSec}`;
    }
    
});
    

progressArea.addEventListener("click", (e)=> {

    let ProgressWidthVal = progressArea.clientWidth;
    let clickedoffset = e.offsetX;
    let audioduration = mainaudio.duration;

    mainaudio.currentTime =(clickedoffset / ProgressWidthVal)*audioduration;

});

/*function simple_repeat_btn()
{
    repeatbtn.classList.remove("shuffle");
    repeatbtn.innerText = "repeat";
}*/
    

repeatbtn.addEventListener("click", ()=> {
    
    let isrepeat = repeatbtn.classList.contains("again");
    /*let isshuffled = repeatbtn.classList.contains("shuffle");

    isshuffled ? simple_repeat_btn() : */isrepeat ? shuffle() : repeat();

    mainaudio.play()
    
});

function repeat ()
{
    repeatbtn.classList.add("again");
    repeatbtn.innerText = "repeat_one";
    iconchange.innerText = "pause";
    mainaudio.currentTime = 0;

}

function randomnumber(min, max)
{
    let rand_no = Math.floor( Math.random() * (max - min + 1));
    return rand_no;
 
}

function shuffle()
{
    
    console.log (randomnumber(0, allsongs.length - 1));
    /*repeatbtn.classList.add("shuffle");*/
    repeatbtn.classList.remove("again");
    repeatbtn.innerText = "shuffle";
    songindex = randomnumber(0, allsongs.length - 1);
    iconchange.innerText = "pause";
    loadsongs(songindex);
 
}








