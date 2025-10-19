// Hero Button Action
document.getElementById("hero-btn").addEventListener("click",()=>{ alert("🚀 Let's get started with MyCompany!"); });

// Signup Form Validation
const signupForm = document.getElementById("signup-form");
const formMsg = document.getElementById("form-msg");
signupForm.addEventListener("submit",(e)=>{
  e.preventDefault();
  const name=document.getElementById("name").value.trim();
  const email=document.getElementById("email").value.trim();
  if(name===""||email===""){ formMsg.style.color="red"; formMsg.textContent="⚠️ Please fill in all fields!"; return; }
  formMsg.style.color="green";
  formMsg.textContent=`✅ Thank you, ${name}! We will contact you at ${email}.`;
  signupForm.reset();
});

// Scroll Reveal Animation & Staggered Cards
const revealElements=document.querySelectorAll(".reveal");
const cards=document.querySelectorAll(".card, .price-card");
function revealOnScroll(){
  const windowHeight=window.innerHeight;
  revealElements.forEach(el=>{
    const top=el.getBoundingClientRect().top;
    if(top<windowHeight-100){ el.style.opacity="1"; el.style.transform="translateY(0)"; }
    else{ el.style.opacity="0"; el.style.transform="translateY(50px)"; }
  });
  cards.forEach((card,index)=>{
    const top=card.getBoundingClientRect().top;
    if(top<windowHeight-100){ setTimeout(()=>{ card.style.opacity="1"; card.style.transform="translateY(0)"; }, index*200);}
    else{ card.style.opacity="0"; card.style.transform="translateY(50px)";}
  });
}
window.addEventListener("scroll",revealOnScroll);
window.addEventListener("load",revealOnScroll);

// Back to Top Button
const backToTop=document.getElementById("back-to-top");
window.addEventListener("scroll",()=>{ if(window.scrollY>400){ backToTop.style.display="block"; }else{ backToTop.style.display="none"; } });
backToTop.addEventListener("click",()=>{ window.scrollTo({top:0,behavior:'smooth'}); });

// Testimonials Slider
const testimonials=document.querySelectorAll(".testimonial");
let currentTest=0;
document.getElementById("next").addEventListener("click",()=>{
  testimonials[currentTest].classList.remove("active");
  currentTest=(currentTest+1)%testimonials.length;
  testimonials[currentTest].classList.add("active");
});
document.getElementById("prev").addEventListener("click",()=>{
  testimonials[currentTest].classList.remove("active");
  currentTest=(currentTest-1+testimonials.length)%testimonials.length;
  testimonials[currentTest].classList.add("active");
});
