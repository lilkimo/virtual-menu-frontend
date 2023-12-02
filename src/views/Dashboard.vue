<script setup>
import {
  TabGroup,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'

import {
  IconVocabulary,
  IconToolsKitchen2,
  IconReceipt2,
  IconCooker,
  IconCheck,
  IconSelector,
  IconChefHat,
  IconLogout,
  IconSettings,
  IconUsersGroup,
} from '@tabler/icons-vue'

import OnlyMobile from '@/components/OnlyMobile.vue'
import VirtualMenu from '@/views/VirtualMenu.vue'
import Recipes from '@/views/Recipes.vue'
import Tables from '@/views/Tables.vue'
import User from '@/views/User.vue'

const restaurants = ['Fukusuke', 'Zinfandel']
</script>

<template>
  <OnlyMobile>
    <div class="flex h-full items-center justify-center text-center">
      Esta página sólo está disponible para computadores :(
    </div>
    <template #fallback>
      <div class="box min-h-screen w-full bg-gray-50">
        <header class="header flex items-center justify-between bg-[#f0e34a] px-[calc(var(--4-3)/2)] py-4">
          <h1 class="text-xl font-medium">Dashboard • {{ 'Fukusuke' }}</h1>
          <div class="flex items-center gap-4">
            <h3>Username</h3>
            <div class="bg-lime-500 h-12 w-12 rounded-lg text-lg" />
          </div>
        </header>
        <TabGroup
          :defaultIndex="3"
          vertical
        >
          <header class="sidebar">
            <TabList class="my-4 ml-[calc(var(--4-3)/2)] flex w-80 flex-col gap-1 rounded-lg bg-white px-6 py-4 shadow">
              <div class="flex items-center gap-2">
                <img
                  class="h-16 w-16 shrink-0 rounded-full"
                  src="https://inden-seminar.com/wp/wp-content/uploads/2022/09/profile-1-1.jpg"
                />
                <span class="text-balance">Carlos Gabriel Mundaca Fernandez</span>
              </div>
              <label>Restaurantes</label>
              <Listbox
                as="div"
                class="relative h-auto w-auto"
                :defaultValue="restaurants[0]"
                :disabled="restaurants.length <= 1"
              >
                <ListboxButton
                  class="relative w-full py-1.5 text-left !text-base ring-1 ring-inset ring-gray-100 ui-open:ring-2 ui-open:ring-black ui-disabled:cursor-not-allowed"
                  v-slot="{value}"
                >
                  <span class="block truncate">{{ value }}</span>
                  <IconSelector
                    class="pointer-events-none absolute inset-y-0 right-0 my-auto mr-2 h-5 w-5 stroke-1 text-gray"
                  />
                </ListboxButton>
                <ListboxOptions class="absolute z-10 mt-1 w-full rounded border border-gray-100 bg-white p-1 shadow">
                  <ListboxOption
                    as="button"
                    v-for="restaurant in restaurants"
                    :key="restaurant"
                    :value="restaurant"
                    class="flex w-full items-center gap-2 rounded p-2 ui-active:bg-black ui-active:text-white"
                    v-slot="{selected}"
                  >
                    <IconCheck
                      class="h-5 w-5 stroke-1"
                      :color="!selected && 'transparent'"
                    />
                    {{ restaurant }}
                  </ListboxOption>
                </ListboxOptions>
              </Listbox>
              <label>Servicios</label>
              <Tab class="btn">
                <IconChefHat class="icon" />
                <h3 class="title">Recetas</h3>
                <div class="related">
                  <span> recetas, ingredientes, ingredientes sensibles </span>
                </div>
              </Tab>
              <Tab class="btn">
                <IconVocabulary class="icon" />
                <h3 class="title">Carta</h3>
                <div class="related">
                  <span> carta virtual, platillos, precios, código qr </span>
                </div>
              </Tab>
              <Tab class="btn">
                <IconCooker class="icon" />
                <h3 class="title">Cocinas</h3>
                <div class="related">
                  <span> cocinas, espacios, stock </span>
                </div>
              </Tab>
              <Tab class="btn">
                <IconToolsKitchen2 class="icon" />
                <h3 class="title">Mesas</h3>
                <div class="related">
                  <span> mesas, clientes, pedidos </span>
                </div>
              </Tab>
              <Tab class="btn">
                <IconReceipt2 class="icon" />
                <h3 class="title">Ventas</h3>
                <div class="related">
                  <span> ventas, beneficios, estadísticas </span>
                </div>
              </Tab>
              <Tab class="btn">
                <IconUsersGroup class="icon" />
                <h3 class="title">Empleados</h3>
                <div class="related">
                  <span> empleados, ajustes, permisos </span>
                </div>
              </Tab>
              <label class="">Usuario</label>
              <Tab class="btn">
                <IconSettings class="icon" />
                <h3 class="title">Ajustes</h3>
              </Tab>
              <button class="btn">
                <IconLogout class="icon" />
                <h3 class="title">Cerrar sesión</h3>
              </button>
            </TabList>
          </header>
          <TabPanels class="panel mr-[calc(var(--4-3)/2)] p-4">
            <TabPanel class="h-full">
              <Recipes />
            </TabPanel>
            <TabPanel>
              <VirtualMenu />
            </TabPanel>
            <TabPanel>Content 3</TabPanel>
            <TabPanel class="h-full">
              <Tables />
            </TabPanel>
            <TabPanel>Content 5</TabPanel>
            <TabPanel>
              <User />
            </TabPanel>
            <TabPanel>Content 7</TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </template>
  </OnlyMobile>
</template>

<style scoped>
@import '@/dashboard.css';

label {
  @apply !mb-0 mt-5 block pl-3;
}

.text-balance {
  /* Problemas de compatibilidad https://caniuse.com/?search=text-wrap */
  text-wrap: balance;
}
.btn {
  @apply text-left text-base hover:bg-gray-100 ui-selected:bg-black ui-selected:text-white;

  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: 1fr auto;
  gap: 0 0.75rem;
  grid-auto-flow: row;
  grid-template-areas:
    'icon title'
    'icon related';
}

.icon {
  @apply my-auto stroke-1 ui-selected:text-white;
  grid-area: icon;
}

.title {
  grid-area: title;
}

.related {
  @apply relative inline-block h-4 overflow-hidden text-xs text-gray;
  grid-area: related;
}
.related > span {
  @apply absolute min-w-full whitespace-nowrap ui-selected:text-white;
}
@keyframes leftright {
  0%,
  20% {
    transform: translateX(0%);
    left: 0%;
  }
  80%,
  100% {
    transform: translateX(-100%);
    left: 100%;
  }
}
.btn:hover > .related > span {
  animation: 3s linear 0s infinite alternate leftright;
}

.box {
  display: grid;
  grid-template-columns: min-content 1fr min-content;
  grid-template-rows: auto 1fr;
  grid-auto-columns: 1fr;
  grid-auto-flow: row;
  grid-template-areas:
    'header header header'
    'sidebar panel panel';
}

.sidebar {
  grid-area: sidebar;
}

.header {
  grid-area: header;
}

.panel {
  grid-area: panel;
}
</style>
