$(function(){

    
    // matchmedia
    ScrollTrigger.matchMedia({
        // large
        "(min-width: 1201px)": function() {
            
            /**
                 * @header스크롤
                 * scrollTrigger
                 * .sc-about에서 3d모션으로 나타나기
                 */
             gsap.from('.header',{
                scrollTrigger:{
                    trigger:".sc-about",
                    start:"80% 100%",
                    end:"20% 0%",
                    scrub:0,
                },
                transformStyle:"preserve-3d",
                transformPreference:1500,
                opacity:0,
                rotateX:-90,
            })
            gsap.to('.header',{
                opacity:1,
                rptateX:0
            })


            

            /**
                 * @프로젝트stagger
                 * 스크롤시 stagger로 하나씩 순차적으로 slide-up
                 */
             gsap.from('.sc-project .works-area',{
                scrollTrigger:{
                    trigger:".sc-project",
                    start:"20% 0%",
                    end:"80% 0%",
                    scrub:0,
                },
                yPercent:40,
                stagger:{
                    from:"random",
                    amount:0.5
                }
                
            })


            
        },
        // medium
        "(min-width: 768px)": function() {
            /**
                 * @화면스크롤고정
                 * 위 영역(.sc-about) 뒤에 숨어있다가 스크롤하면 나타나기
                 */
             gsap.set('.sc-works .text-box',{
                y:-800
            })
            gsap.to('.sc-works .text-box',{
                scrollTrigger:{
                    trigger:".sc-works",
                    start:"0% 100%",
                    end:"0% 0%",
                    scrub:0,
                },
                ease:'none',
                y:0,
                
            })
            
            /**
                 * @SplitType텍스트슬라이드
                 * words로 쪼개서 slideUp
                 */
             const aboutText = new SplitType('.sc-about p', {types: 'words,chars'})
             gsap.from(aboutText.words, {
                 scrollTrigger:{
                     trigger:".sc-about",
                     start:"-40% 0%",
                     end: "30% 0%",
                     scrub:true
                 },
                 opacity:0,
                 duration: 1,
                 yPercent: 100,
                 ease: "power3",
                 stagger: 0.1
             })    
            
             /**
                 * @shape3d회전
                 * 스크롤할때 한바퀴 회전하는 shape 구현
                 * @텍스트fill모션
                 * background-position-X로 0%부터100%까지 채워지는 모션
                 */
              gsap.set('.sc-works .shape-box',{opacity:0,rotate:360, rotateY:180, scale:3})
              worksPin = gsap.timeline({
                  scrollTrigger:{
                      trigger:".sc-works",
                      start:"0%",
                      end:"100%",
                      scrub:0,
                      pin:true,
                  }
              })
              worksPin
              .addLabel('a')
              .to('.sc-works .shape-box',{opacity:1,rotate:0, rotateY:0, scale:1},'a')
              .to('.sc-works .title',{backgroundPositionX:'0%'},'a')
            
        },
        // small
        "(max-width: 767px)": function() {
            /**
             * 모바일용
            * @shape3d회전
            * 스크롤할때 한바퀴 회전하는 shape 구현
            * @텍스트fill모션
            * background-position-X로 0%부터100%까지 채워지는 모션
            */
             gsap.set('.sc-works .shape-box',{opacity:0,rotate:360, rotateY:180, scale:3})
             worksPinMo = gsap.timeline({
                 scrollTrigger:{
                     trigger:".sc-works",
                     start:"-50%",
                     end:"50%",
                     scrub:1,
                 },
             })
             worksPinMo
             .addLabel('a')
             .to('.sc-works .shape-box',{opacity:1,rotate:0, rotateY:0, scale:1},'a')
             .to('.sc-works .title',{backgroundPositionX:'0%'},'a')
        },
        // all
        "all": function() {
            
            /**
                 * @인트로스크롤모션
                 * scrub으로 텍스트 무빙 조정
                 */
             bdboxMotion = gsap.timeline({
                scrollTrigger:{
                    trigger:".sc-intro",
                    start:"0% 100%",
                    end:"100% 0%",
                    scrub:1,
                },
            })
            bdboxMotion
            .addLabel('a')
            .to('.sc-banner p',{x:-1000},'a')
            .from('.sc-intro .boder-scroll',{y:-1000},'a')
                /**
                 * @지정된위치이동
                 * click 이벤트
                 * gnb-item 클릭 시 타겟페이지로 이동
                 * html -> data-frame에 페이지 코드명 걸기
                 * scrollTo : 지정된 위치로 이동
                 */
                $('.gnb .gnb-item a').click(function(e){
                    e.preventDefault();
            
                    target = $(this).data('frame')
            
                    gsap.to(window, {duration: 1.5, scrollTo:target});
                    
                })
            
                

                /**
                 * @폰트애니메이션
                 * EventListener -> mousemove
                 * 마우스커서의 x와y축을 따라다니는 애니메이션 구현
                 * ease:circ.out으로 곡선 애니메이션 구현
                 */
                const cursor = document.querySelector('.cursor');
                const letter = document.querySelectorAll('.letter');
            
                window.onload = ()=>{
                    
                   let lastX = 0;
                   let lastY = 0;
                window.addEventListener('mousemove',(event)=>{
                    const [x,y] = [event.clientX, event.clientY];
                    cursor.style.left = event.clientX + 'px';
                    cursor.style.top = event.clientY + "px";
            
                   lastX = x;
                   lastY = y;
                    gsap.to(letter, {
                        top:y, 
                        left:x, 
                        delay: .001,
                        duration:2.5,
                         ease:'circ.out',
                         stagger:.01
                        })
            
                })
                };
            
            
                
                
            
                
                

                
            
        }
    }); 

})