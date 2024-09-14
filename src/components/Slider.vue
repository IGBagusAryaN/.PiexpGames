<template>
    <div class="sliders py-0 mt-20" style="
    --width: 200px;
    --height: 50px;
    --quantity: 8;">
        <div class="list ">
            <div class="flex">
                <img class="item " src="../assets/Logo/image 1.jpg" alt="" width="200" style="--position:1">
                <img class="item " src="../assets/Logo/image 2.jpg" alt="" width="120" style="--position:2">
                <img class="item " src="../assets/Logo/image 3.jpg" alt="" width="150" style="--position:3">
                <img class="item " src="../assets/Logo/image 4.png" alt="" width="120" style="--position:4">
                <img class="item " src="../assets/Logo/image 5.jpg" alt="" width="200" style="--position:5">
                <img class="item " src="../assets/Logo/image 7.png" alt="" width="150" style="--position:6">
                <img class="item " src="../assets/Logo/image 8.jpg" alt="" width="180" style="--position:7">
                <img class="item " src="../assets/Logo/image 9.jpg" alt="" width="120" style="--position:8">
                <!-- <img class="item " src="../assets/Logo/image 10.png" alt="" width="100" style="--position:9"> -->
                <!-- <img class="item " src="../assets/Logo/image 10.png" alt="" width="100" style="--position:10"> -->

            </div>
        </div>
    </div>
    <div class="sliders" reverse="true" style="
    --width: 170px;
    --height: 150px;
    --quantity: 8;">
        <div class="list ">
            <div class="flex">
                <img class="item " src="../assets/Logo/image 11.jpg" alt="" width="200" style="--position:1">
                <img class="item " src="../assets/Logo/image 12.jpg" alt="" width="120" style="--position:2">
                <img class="item " src="../assets/Logo/image 13.jpg" alt="" width="150" style="--position:3">
                <img class="item " src="../assets/Logo/image 14.jpg" alt="" width="120" style="--position:4">
                <img class="item " src="../assets/Logo/image 15.jpg" alt="" width="200" style="--position:5">
                <img class="item " src="../assets/Logo/image 16.jpg" alt="" width="150" style="--position:6">
                <img class="item " src="../assets/Logo/image 17.jpg" alt="" width="180" style="--position:7">
                <img class="item " src="../assets/Logo/image 18.jpg" alt="" width="120" style="--position:8">
                <!-- <img class="item " src="../assets/Logo/image 10.png" alt="" width="100" style="--position:9"> -->
                <!-- <img class="item " src="../assets/Logo/image 10.png" alt="" width="100" style="--position:10"> -->

            </div>
        </div>
    </div>
</template>


<style>
.sliders {
    width: 80%;
    margin: 10px auto 10px auto; 
    /* border: 1px solid red; */
    overflow: hidden;
    mask-image: linear-gradient(
    to right,
    transparent,
    #000 5% 95%,
    transparent
);

}

.list {
    width: 100%;
    height: var(--height);
    min-width: calc(100px * var(--quantity));
    position: relative;
}

.item {
    position: absolute;
    left: 100%;
    transition: filter 0,5s;
    animation: autoRun 10s linear infinite;
    animation-delay: calc((10s / var(--quantity)) * (var(--position) - 1)) !important;
    width: var(--width);
    height: var(--height);
}

@keyframes autoRun {
    from{
        left:100%
    }to {
        left: -800px
    }
}

.sliders:hover .item {
    animation-play-state: paused !important;
    filter: grayscale(1);
}

.sliders .item:hover {
    filter: grayscale(0);
    cursor: pointer;
}

.sliders[reverse="true"] .item {
    animation: reversePlay 10s linear infinite;
}

@keyframes reversePlay {
    from{
        left:-800px
    }to {
        left: 100%
    }
}
</style>