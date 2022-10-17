const  button = document.querySelector('button')

const TEST_COUNT = 20
const progress = document.querySelector('.progress')
const speedText = document.querySelector('.speed-text')
let test_results = []

var imageAddr = "https://drive.google.com/u/1/uc?id=15fzJ1ZRK0I3s5dIj2cYr_gbau9PmiJzq&export=download"
var size = 4362493 * 8 ; //image size in bytes

//let startTime = Date.now()
function loadImage(){
        return new Promise((resolve, reject) => {
            let startTime = Date.now()

            var download = new Image();
            download.src = imageAddr;
            download.onload = function(){
                let endTime = Date.now()
                console.log(endTime - startTime);
                resolve( endTime - startTime)
            }
            download.onerror = function(err){
                reject(err)
            }
            var cacheBuster = "?nnn=" + startTime;
            download.src = imageAddr + cacheBuster;
            })
}


async function getLoadSpeed(){
    let loadTime = await loadImage()
    //if(loadTime < 1) loadTime = 1
    let speed_bps = size / (loadTime / 1000)
    let speed_kbps = speed_bps / 1024
    let speed_Mbps = speed_kbps / 1024

    return speed_Mbps
}

function getAvgSpeed(){
    let sum = test_results.reduce((a, b) => a + b, 0)

    return sum / test_results.length
}

button.addEventListener('click', async function(){
    for(let i = 0; i < TEST_COUNT; i++){
        let speed = await getLoadSpeed()
        test_results.push(speed)
        progress.style.width = ((i + 1) / TEST_COUNT * 100) + '%'
        speedText.innerText = getAvgSpeed().toFixed(2) + ' Mbps'
    }
})
