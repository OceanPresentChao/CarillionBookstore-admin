<template>
    <div>
        <div class=" bg-blue-500 text-center py-14 text-white">
            <h1 class="text-4xl">ABOUT US</h1>
            <div class="text-xl">
                <router-link to="/">Home</router-link>
                <span>·</span>
                <router-link to="/about">About us</router-link>
            </div>
        </div>

        <div class="flex mt-24">
            <img class="flex-none rounded-l-none rounded-r-3xl" style="max-width: 45%;height:auto;"
                src="https://source.unsplash.com/random" />
            <div class="ml-5 my-auto text-lg">
                <h1 class="text-3xl mb-5 border-b-2">LEARN ABOUT US</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec pretium mi. Curabitur
                    facilisis ornare velit non vulputate. Aliquam metus tortor, auctor id gravida condimentum,
                    viverra quis sem. Curabitur non nisl nec nisi scelerisque maximus. Aenean consectetur convallis
                    porttitor. Aliquam interdum at lacus non blandit.
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec pretium mi. Curabitur
                    facilisis ornare velit non vulputate. Aliquam metus tortor, auctor id gravida condimentum,
                    viverra quis sem. Curabitur non nisl nec nisi scelerisque maximus. Aenean consectetur convallis
                    porttitor. Aliquam interdum at lacus non blandit.
                </p>
                <div class="my-5">
                    <button class="bg-blue-400 rounded-lg p-1 text-white">
                        <a href="https://github.com/OceanPresentChao/CarillionBookstore-admin" target="_blank">
                            <Icon class="inline-block w-5 h-5" icon="carbon:email"></Icon>
                            <span>Click Me</span>
                        </a>
                    </button>
                </div>
            </div>
        </div>
        <div class="mt-24">
            <div class="text-center">
                <h1 class="text-3xl border-b-red-300 border-b-2">
                    Our Story
                </h1>
                <p class="text-xl mt-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec pretium ornare velit non
                </p>
            </div>
            <div class="mt-3 mx-36">
                <el-timeline class="text-xl">
                    <el-timeline-item timestamp="2018/4/12" placement="top">
                        <el-card>
                            <h4>Update Github template</h4>
                            <p>Tom committed 2018/4/12 20:46</p>
                        </el-card>
                    </el-timeline-item>
                    <el-timeline-item timestamp="2018/4/3" placement="top">
                        <el-card>
                            <h4>Update Github template</h4>
                            <p>Tom committed 2018/4/3 20:46</p>
                        </el-card>
                    </el-timeline-item>
                    <el-timeline-item timestamp="2018/4/2" placement="top">
                        <el-card>
                            <h4>Update Github template</h4>
                            <p>Tom committed 2018/4/2 20:46</p>
                        </el-card>
                    </el-timeline-item>
                </el-timeline>
            </div>
        </div>

        <div class="my-24">
            <div class="text-center">
                <h1 class="text-3xl border-b-yellow-300 border-b-2">
                    Our Team
                </h1>
                <p class="text-xl mt-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec pretium ornare velit non
                </p>
            </div>
            <div class="flex justify-around mt-5">
                <template v-for="m in memberShip" :key="m.name">
                    <div class="round-t member-item">
                        <img :src="m.avatar" class="inline-block rounded-full member-avatar">
                        <div class="text-center">
                            <h1 class="text-2xl mt-2">{{ m.name }}</h1>
                            <p class="text-lg">{{ m.role }}</p>
                        </div>
                        <div class="member-hover round-t">
                            <Icon icon="carbon:logo-github" class="member-icon"></Icon>
                            <Icon icon="cib:tencent-qq" class="member-icon"></Icon>
                            <Icon icon="carbon:logo-wechat" class="member-icon"> </Icon>
                            <Icon icon="carbon:logo-twitter" class="member-icon"> </Icon>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const memberShip = [
    {
        name: '潮海波',
        role: '相信你那绯色樱云般的心思情愫，也一定被心间的人感知着。',
        avatar: "http://q1.qlogo.cn/g?b=qq&nk=1255342403&s=640"
    },
    {
        name: '李柯凡',
        role: 'into the sky',
        avatar: "http://q1.qlogo.cn/g?b=qq&nk=153648356&s=640"
    },
    {
        name: '许嘉豪',
        role: 'JaCppPyRugothon，JsCssHtSpVuBoot。All_In_One!',
        avatar: "http://q1.qlogo.cn/g?b=qq&nk=513979437&s=640"
    },
    {
        name: '鞠昌毅',
        role: 'dendendendenden一阵前奏飘着，所有事都被想了起来，千万不要去细想，一想就开始怀念起所有人来。',
        avatar: "http://q1.qlogo.cn/g?b=qq&nk=1252951279&s=640"
    },
    {
        name: '韩强',
        role: '眼前人是心上人',
        avatar: "http://q1.qlogo.cn/g?b=qq&nk=1838162796&s=640"
    }
]
</script>

<style scoped>
.round-t {
    border-top-left-radius: 40%;
    border-top-right-radius: 40%;
}

.member-item {
    position: relative;
    margin-bottom: 30px;
    padding: 30px;
    background: rgba(0, 0, 0, .05);
    margin: 0 1rem;
    width: 20%;
}

.member-hover {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    padding: 30px 20px;
    display: flex;
    align-items: flex-end;
    justify-content: space-around;
    background: rgba(79, 132, 196, .92);
    opacity: 0;
    transition: .5s;
}

.member-item:hover .member-hover {
    opacity: 1;
}

.member-icon {
    width: 1.5rem;
    height: 1.5rem;
}

.member-avatar {
    width: 100%;
    height: auto;
}
</style>