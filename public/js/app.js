console.log("cleint side running")


const weatherform=document.querySelector('form')
const searchElement=document.querySelector('input')
const msg1 =document.querySelector('#msg1')
const msg2=document.querySelector('#msg2')



weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=searchElement.value   
    msg1.textContent='Loading..' 
    msg2.textContent=''
    fetch('http://localhost:3000/weather?address='+location).then((res)=>{
res.json().then((data)=>{
    if(data.error){
        msg1.textContent=data.error
    }
    else{
        msg1.textContent=data.location
        msg2.textContent=data.forecast
    }
})
}) 
   
})