const validate = new window.JustValidate('#ProfieForm');


validate.addField('#UserName', [
    {
        rule: 'required',
    },
    {
        rule: 'minLength',
        value: 3,
    },

])

validate.addField('#role', [
    {
        rule: 'required',
    }
])

validate.addField('#Skills', [
    {
        rule: 'required',
    }
])


validate.addField('#passions', [
    {
        rule: 'required',
    }
])
//============================================================================================================================

validate.onSuccess(() => {
    const form = document.getElementById('ProfieForm');
    const formdata = new FormData(form);

    const formObj = Object.fromEntries(formdata);



    function getfileData(info) {
        const file = info.files[0];
        const reader = new FileReader;
        reader.onload = function (e) {
            const imgsrc = e.target.result;
            formObj.userphoto = imgsrc;

            localStorage.setItem('userData', JSON.stringify(formObj));
        }
        reader.readAsDataURL(file)
    }

    const getPhoto = document.getElementById('getPhoto');
    getfileData(getPhoto);

    profileCard.classList.remove('hidden');
    alert(`you're submited succesfully`);



    showdetail();
    showUserPassion();
    showSkills();

});

//=======================================================================================================================
//getting a data localSotage and show a profile



const passionEl = document.querySelector('#userPassion');
const skillulEl=document.querySelector('#profileSkills');

//image
function showdetail() {
    const imgEl = document.getElementById('userimg');
    const name = document.querySelector('#profileName');
    const roleEl =document.querySelector('#userRole')

    //profileCard
    const profileCard =document.getElementById('profileCard');
    const userData = JSON.parse(localStorage.getItem('userData'));
    
    if(userData)
    {
        profileCard.classList.remove('hidden')

        //userName
        name.innerText = userData.userName;

        //image
        imgEl.src= userData.userphoto;

        //role
        roleEl.innerText = userData.role.toUpperCase();

    }
}


function showSkills(){
    skillulEl.innerHTML =''
    const userData = JSON.parse(localStorage.getItem('userData'));
  const skill =userData.userskills.toUpperCase().split(',');
  skill.forEach( value =>{
     const li=document.createElement('li')
      li.innerText=value;
      skillulEl.append(li);
  });
}



function showUserPassion(){
    passionEl.innerHTML =''
    const userData = JSON.parse(localStorage.getItem('userData'));
   const passion =userData.passions.toLowerCase().split(',');
   passion.forEach( (val)=>{
    const li=document.createElement('li')
    li.innerText=val;

    passionEl.append(li);
   })
}

showdetail();
showSkills();
showUserPassion();


const getphoto=document.getElementById('getPhoto');
const cameraSvg =document.getElementById('imageIcons');




getphoto.addEventListener('click',(e)=>{

   if(e.target.files[0]!='undefined'){
      cameraSvg.style.color="green"
   }
});