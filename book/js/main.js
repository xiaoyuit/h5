let currentPage = 1;
let $ = document.querySelector.bind(document);
$('.next').addEventListener('click', goToNextPage);
const flipAnimateTime = 1000;
function goToNextPage () {
    // 触发CSS动画
    $('.paper[data-right]').setAttribute('data-begin-animate', true);
    setTimeout(() => {
        // data-right变成data-left
        let $rightPaper = $('.paper[data-right]'),
            $leftPaper = $('.paper[data-left]');
        $rightPaper.removeAttribute('data-right');
        $rightPaper.querySelector('.page-2').classList.remove('page-2');
        $rightPaper.querySelector('.page-2-back').classList.remove('page-2-back');
        $rightPaper.setAttribute('data-left', true);
        // data-left没有了
        $leftPaper.removeAttribute('data-left');
        $leftPaper.querySelector('.page-1').classList.remove('page-1');
        $leftPaper.querySelector('.page-1-back').classList.remove('page-1-back');
        // 重新设置类的关系
        $leftPaper = $rightPaper;
        $rightPaper = $leftPaper.nextElementSibling;
        $leftPaper.querySelector('.page').classList.add('page-1-back');
        $leftPaper.querySelector('.page + .page').classList.add('page-1');
        // 如果还有下一页
        if ($rightPaper) {
            $rightPaper.setAttribute('data-right', true);
            $rightPaper.querySelector('.page').classList.add('page-2');
            $rightPaper.querySelector('.page + .page').classList.add('page-2-back');
        }   
        currentPage++;
    }, flipAnimateTime);
}