<template>
    <section id = "team">
        <div class="bg">
            <nb></nb>
            <b-container fluid class="text-center">
                <b-row>
                    <b-col>
                        <h1 >The Team behind LoNUS</h1>
                        <p class = "mt-2">Established in 2020. We aim to improve the lives of NUS students.</p>
                    </b-col>
                </b-row>
            </b-container>

            <b-container>
                <b-row>
                    <b-col>
                        <b-card title="Choo Su lyn" img-src="..\assets\sulyn.jpg" img-alt="Image" img-top tag="article"
                            style="max-width: 20rem;" class="mb-2 img-fluid mb-3 m-0" border-variant="dark" text-variant="dark">
                            <b-card-text >
                                Year 2 business analytics student.
                            </b-card-text>                
                            <div class="d-flex flex-row justify-content-center">
                                <div class="p-4">
                                    <a href="https://t.me/Ataraxific">
                                        <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'telegram'}"/>
                                    </a>
                                </div>
                                <div class="p-4">
                                    <a href="https://www.instagram.com/ataraxific/">
                                        <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'instagram'}"/>
                                    </a>
                                </div>
                            </div>
                        </b-card>
                    </b-col>
                    <b-col >
                        <b-card title="Caitlin Ong" img-src="..\assets\kaitilin.jpg" img-alt="Image" img-top tag="article"
                            style="max-width: 20rem;" class="mb-2 img-fluid mb-3" border-variant="dark" text-variant="dark" >
                            <b-card-text>
                                Year 2 business analytics student who drinks too much coffee.
                            </b-card-text>                
                            <div class="d-flex flex-row justify-content-center">
                                <div class="p-4">
                                    <a href="https://t.me/cait_o">
                                        <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'telegram'}"/>
                                    </a>
                                </div>
                                <div class="p-4">
                                    <a href="https://www.instagram.com/cait.kl/">
                                        <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'instagram'}"/>
                                    </a>
                                </div>
                            </div>
                        </b-card>
                    </b-col>
                    <b-col>
                        <b-card title="Chua Yi Fang" img-src="..\assets\yifang4.jpg" img-alt="Image" img-top tag="article" 
                            style="max-width: 20rem;" class="mb-2 img-fluid mb-3" border-variant="dark" text-variant="dark">
                            <b-card-text>
                                Year 2 business analytics student who loves BTS.
                            </b-card-text>                
                            <div class="d-flex flex-row justify-content-center">
                                <div class="p-4">
                                    <a href="https://t.me/onefang">
                                        <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'telegram'}"/>
                                    </a>
                                </div>
                                <div class="p-4">
                                    <a href="https://www.instagram.com/yifaang/">
                                        <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'instagram'}"/>
                                    </a>
                                </div>
                            </div>
                        </b-card>
                    </b-col>
                </b-row>
            </b-container>
            <b-container>
                <b-row align-h="center">
                    <b-col cols = "4">
                        <b-card title="Chua Wen Feng" img-src="..\assets\wenfeng.jpg" img-alt="Image" img-top tag="article"
                            style="max-width: 20rem;" class="mb-2 img-fluid mb-3" border-variant="dark" text-variant="dark">
                            <b-card-text>
                                Year 2 business analytics student.
                            </b-card-text>                
                            <div class="d-flex flex-row justify-content-center">
                                <div class="p-4">
                                    <a href="https://t.me/cwf97">
                                        <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'telegram'}"/>
                                    </a>
                                </div>
                                <div class="p-4">
                                    <a href="https://www.instagram.com/chuawf/">
                                        <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'instagram'}"/>
                                    </a>
                                </div>
                            </div>
                        </b-card>
                    </b-col>
                    <b-col cols = "4">
                        <b-card title="Lim Wei Zheng" img-src= '..\assets\weizheng2.jpg' img-alt="Image" img-top tag="article"
                            style="max-width: 20rem;" class="mb-2 img-fluid mb-3" border-variant="dark" text-variant="dark">
                            <b-card-text>
                                Year 2 business analytics student with a passion for data analytics.
                            </b-card-text>                
                            <div class="d-flex flex-row justify-content-center">
                                <div class="p-4">
                                    <a href="https://t.me/wei_zhenggg">
                                        <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'telegram'}"/>
                                    </a>
                                </div>
                                <div class="p-4">
                                    <a href="https://www.instagram.com/wei_zhenggg/">
                                        <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'instagram'}"/>
                                    </a>
                                </div>
                            </div>
                        </b-card>
                    </b-col>
                </b-row>
            </b-container>
        </div>
    </section>
</template>

<script>
import NavBar from './NavBar.vue'
    export default {
        components: {
            'nb':NavBar
        }
    }
</script>

<style>
    body, html {
      height: 100%;
    }

    h1 {
        margin-top:20px;
        font-family: sans-serif;
        font-weight: bold;
    }
    
    .mt-2 {
        font-family:sans-serif;
        /*font-weight: bold;*/
        font-size:120%
    }
  </style>