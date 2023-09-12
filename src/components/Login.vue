<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const email = ref("");
const condition = ref(true);

import { googleLogout } from "vue3-google-login";
import { decodeCredential } from "vue3-google-login";
import App from "../App.vue";

const callback = (response) => {
  const userData = decodeCredential(response.credential);
  email.value = userData.email;
  condition.value = true;
  console.log("Handle the userData", email);
};

function handleSignOut() {
  //your logout logics
  googleLogout();
  email.value = "User not logged in";
  condition.value = false;
}
</script>

<template>
  <!-- Google signin -->
  <div
    v-if="!condition"
    className="h-screen bg-gray-100 p-10 grid grid-cols-1  "
  >
    <div className="place-self-center">
      <form
        className=" grid grid-cols-1 gap-4 p-9  rounded-xl  shadow-xl  bg-[#f9fafb] max-w-sm mx-auto  "
      >
        <GoogleLogin :callback="callback" />
      </form>
    </div>
  </div>

  <!-- User Register -->
  <div
    v-if="condition"
    class="container ml-auto mr-auto flex items-center justify-center"
  >
    <div class="w-full md:w-1/2">
      <form class="mb-4 bg-background px-8 pb-8 pt-6">
        <div class="top-2 mb-4 flex flex-col">
          <div class="flex flex-col gap-3">
            <div class="flex flex-col justify-center">
              <label
                class="mb-2 block text-left text-sm font-bold text-[#374151]"
                for="run"
              >
                Run
              </label>
              <input
                class="focus:shadow-outline w-full appearance-none rounded border bg-[#f9fafb] px-3 py-2 leading-tight text-[#374151] shadow focus:bg-background focus:outline-none"
                id="run"
                type="text"
                placeholder=""
                required
              />
            </div>

            <div class="flex flex-col justify-center">
              <label
                class="mb-2 block text-left text-sm font-bold text-[#374151]"
                for="nya"
              >
                Nombre completo
              </label>
              <input
                class="focus:shadow-outline w-full appearance-none rounded border bg-[#f9fafb] px-3 py-2 leading-tight text-[#374151] shadow focus:bg-background focus:outline-none"
                id="nya"
                type="text"
                placeholder=""
                required
              />
            </div>

            <div class="justify-center">
              <label
                class="mb-2 block text-left text-sm font-bold text-[#374151]"
                for="bd"
              >
                Fecha de nacimiento
              </label>
              <input
                class="focus:shadow-outline w-full appearance-none rounded border bg-[#f9fafb] px-3 py-2 leading-tight text-[#374151] shadow focus:bg-background focus:outline-none"
                id="bd"
                type="date"
                required
              />
            </div>

            <div class="justify-center">
              <label
                class="mb-2 block text-left text-sm font-bold text-[#374151]"
                for="sexo"
              >
                Sexo
              </label>
              <select
                class="focus:shadow-outline w-full appearance-none rounded border bg-[#f9fafb] px-3 py-2 leading-tight text-[#374151] shadow focus:bg-background focus:outline-none"
                id="sexo"
                type="text"
                required
              >
                <option>Hombre</option>
                <option>Mujer</option>
              </select>
            </div>

            <div class="justify-center">
              <label
                class="mb-2 block text-left text-sm font-bold text-[#374151]"
                for="tel"
              >
                Telefono
              </label>
              <input
                class="focus:shadow-outline w-full appearance-none rounded border bg-[#f9fafb] px-3 py-2 leading-tight text-[#374151] shadow focus:bg-background focus:outline-none"
                id="tel"
                type="tel"
                required
              />
            </div>

            <div class="justify-center">
              <label
                class="mb-2 block text-left text-sm font-bold text-[#374151]"
                for="direccion"
              >
                Direccion
              </label>
              <input
                class="focus:shadow-outline w-full appearance-none rounded border bg-[#f9fafb] px-3 py-2 leading-tight text-[#374151] shadow focus:bg-background focus:outline-none"
                id="direccion"
                type="text"
                required
              />
            </div>

            <div class="justify-center">
              <label
                class="mb-2 block text-left text-sm font-bold text-[#374151]"
                for="comuna"
              >
                Region
              </label>
              <select
                class="focus:shadow-outline w-full appearance-none rounded border bg-[#f9fafb] px-3 py-2 leading-tight text-[#374151] shadow focus:bg-background focus:outline-none"
                id="nya"
                type="text"
                required
              >
                <option>Arica y Parinacota</option>
                <option>Tarapacá</option>
                <option>Antofagasta</option>
                <option>Atacama</option>
                <option>Coquimbo</option>
                <option>Valparaiso</option>
                <option>Metropolitana de Santiago</option>
                <option>Libertador General Bernardo O'Higgins</option>
                <option>Maule</option>
                <option>Biobío</option>
                <option>La Araucanía</option>
                <option>Los Ríos</option>
                <option>Los Lagos</option>
                <option>Aisén del General Carlos Ibáñez del Campo</option>
                <option>Magallanes y de la Antártica Chilena</option>
              </select>
            </div>

            <div class="flex">
              <div class="width-1/2 justify-center sm:col-span-4">
                <label
                  class="mb-2 block text-left text-sm font-bold text-[#374151]"
                  for="comuna"
                >
                  Provincia
                </label>
                <select
                  class="focus:shadow-outline w-full appearance-none rounded border bg-[#f9fafb] px-3 py-2 leading-tight text-[#374151] shadow focus:bg-background focus:outline-none"
                  id="nya"
                  type="text"
                  required
                >
                  <option>Arica</option>
                  <option>Parinacota</option>
                  <option>Iquique</option>
                  <option>El Tamarugal</option>
                  <option>Antofagasta</option>
                  <option>El Loa</option>
                  <option>Tocopilla</option>
                  <option>Chañaral</option>
                  <option>Copiapó</option>
                  <option>Huasco</option>
                  <option>Choapa</option>
                  <option>Elqui</option>
                  <option>Limarí</option>
                  <option>Isla de Pascua</option>
                  <option>Los Andes</option>
                  <option>Petorca</option>
                  <option>Quillota</option>
                  <option>San Antonio</option>
                  <option>San Felipe de Aconcagua</option>
                  <option>Valparaiso</option>
                  <option>Chacabuco</option>
                  <option>Cordillera</option>
                  <option>Maipo</option>
                  <option>Melipilla</option>
                  <option>Santiago</option>
                  <option>Talagante</option>
                  <option>Cachapoal</option>
                  <option>Cardenal Caro</option>
                  <option>Colchagua</option>
                  <option>Cauquenes</option>
                  <option>Curicó</option>
                  <option>Linares</option>
                  <option>Talca</option>
                  <option>Arauco</option>
                  <option>Bio Bío</option>
                  <option>Concepción</option>
                  <option>Ñuble</option>
                  <option>Cautín</option>
                  <option>Malleco</option>
                  <option>Valdivia</option>
                  <option>Ranco</option>
                  <option>Chiloé</option>
                  <option>Llanquihue</option>
                  <option>Osorno</option>
                  <option>Palena</option>
                  <option>Aisén</option>
                  <option>Capitán Prat</option>
                  <option>Coihaique</option>
                  <option>General Carrera</option>
                  <option>Antártica Chilena</option>
                  <option>Magallanes</option>
                  <option>Tierra del Fuego</option>
                  <option>Última Esperanza</option>
                </select>
              </div>

              <div class="width-1/2 justify-center sm:col-span-4">
                <label
                  class="mb-2 block text-left text-sm font-bold text-[#374151]"
                  for="comuna"
                >
                  Comuna
                </label>
                <select
                  class="focus:shadow-outline w-full appearance-none rounded border bg-[#f9fafb] px-3 py-2 leading-tight text-[#374151] shadow focus:bg-background focus:outline-none"
                  id="nya"
                  type="text"
                  required
                >
                  <option>Arica</option>
                  <option>Camarones</option>
                  <option>General Lagos</option>
                  <option>Putre</option>
                  <option>Alto Hospicio</option>
                  <option>Iquique</option>
                  <option>Camiña</option>
                  <option>Colchane</option>
                  <option>Huara</option>
                  <option>Pica</option>
                  <option>Pozo Almonte</option>
                  <option>Antofagasta</option>
                  <option>Mejillones</option>
                  <option>Sierra Gorda</option>
                  <option>Taltal</option>
                  <option>Calama</option>
                  <option>Ollague</option>
                  <option>San Pedro de Atacama</option>
                  <option>María Elena</option>
                  <option>Tocopilla</option>
                  <option>Chañaral</option>
                  <option>Diego de Almagro</option>
                  <option>Caldera</option>
                  <option>Copiapó</option>
                  <option>Tierra Amarilla</option>
                  <option>Alto del Carmen</option>
                  <option>Freirina</option>
                  <option>Huasco</option>
                  <option>Vallenar</option>
                  <option>Canela</option>
                  <option>Illapel</option>
                  <option>Los Vilos</option>
                  <option>Salamanca</option>
                  <option>Andacollo</option>
                  <option>Coquimbo</option>
                  <option>La Higuera</option>
                  <option>La Serena</option>
                  <option>Paihuaco</option>
                  <option>Vicuña</option>
                  <option>Combarbalá</option>
                  <option>Monte Patria</option>
                  <option>Ovalle</option>
                  <option>Punitaqui</option>
                  <option>Río Hurtado</option>
                  <option>Isla de Pascua</option>
                  <option>Calle Larga</option>
                  <option>Los Andes</option>
                  <option>Rinconada</option>
                  <option>San Esteban</option>
                  <option>La Ligua</option>
                  <option>Papudo</option>
                  <option>Petorca</option>
                  <option>Zapallar</option>
                  <option>Hijuelas</option>
                  <option>La Calera</option>
                  <option>La Cruz</option>
                  <option>Limache</option>
                  <option>Nogales</option>
                  <option>Olmué</option>
                  <option>Quillota</option>
                  <option>Algarrobo</option>
                  <option>Cartagena</option>
                  <option>El Quisco</option>
                  <option>El Tabo</option>
                  <option>San Antonio</option>
                  <option>Santo Domingo</option>
                  <option>Catemu</option>
                  <option>Llaillay</option>
                  <option>Panquehue</option>
                  <option>Putaendo</option>
                  <option>San Felipe</option>
                  <option>Santa María</option>
                  <option>Casablanca</option>
                  <option>Concón</option>
                  <option>Juan Fernández</option>
                  <option>Puchuncaví</option>
                  <option>Quilpué</option>
                  <option>Quintero</option>
                  <option>Valparaíso</option>
                  <option>Villa Alemana</option>
                  <option>Viña del Mar</option>
                  <option>Colina</option>
                  <option>Lampa</option>
                  <option>Tiltil</option>
                  <option>Pirque</option>
                  <option>Puente Alto</option>
                  <option>San José de Maipo</option>
                  <option>Buin</option>
                  <option>Calera de Tango</option>
                  <option>Paine</option>
                  <option>San Bernardo</option>
                  <option>Alhué</option>
                  <option>Curacaví</option>
                  <option>María Pinto</option>
                  <option>Melipilla</option>
                  <option>San Pedro</option>
                  <option>Cerrillos</option>
                  <option>Cerro Navia</option>
                  <option>Conchalí</option>
                  <option>El Bosque</option>
                  <option>Estación Central</option>
                  <option>Huechuraba</option>
                  <option>Independencia</option>
                  <option>La Cisterna</option>
                  <option>La Granja</option>
                  <option>La Florida</option>
                  <option>La Pintana</option>
                  <option>La Reina</option>
                  <option>Las Condes</option>
                  <option>Lo Barnechea</option>
                  <option>Lo Espejo</option>
                  <option>Lo Prado</option>
                  <option>Macul</option>
                  <option>Maipú</option>
                  <option>Ñuñoa</option>
                  <option>Pedro Aguirre Cerda</option>
                  <option>Peñalolén</option>
                  <option>Providencia</option>
                  <option>Pudahuel</option>
                  <option>Quilicura</option>
                  <option>Quinta Normal</option>
                  <option>Recoleta</option>
                  <option>Renca</option>
                  <option>San Miguel</option>
                  <option>San Joaquín</option>
                  <option>San Ramón</option>
                  <option>Santiago</option>
                  <option>Vitacura</option>
                  <option>El Monte</option>
                  <option>Isla de Maipo</option>
                  <option>Padre Hurtado</option>
                  <option>Peñaflor</option>
                  <option>Talagante</option>
                  <option>Codegua</option>
                  <option>Coínco</option>
                  <option>Coltauco</option>
                  <option>Doñihue</option>
                  <option>Graneros</option>
                  <option>Las Cabras</option>
                  <option>Machalí</option>
                  <option>Malloa</option>
                  <option>Mostazal</option>
                  <option>Olivar</option>
                  <option>Peumo</option>
                  <option>Pichidegua</option>
                  <option>Quinta de Tilcoco</option>
                  <option>Rancagua</option>
                  <option>Rengo</option>
                  <option>Requínoa</option>
                  <option>San Vicente de Tagua Tagua</option>
                  <option>La Estrella</option>
                  <option>Litueche</option>
                  <option>Marchihue</option>
                  <option>Navidad</option>
                  <option>Peredones</option>
                  <option>Pichilemu</option>
                  <option>Chépica</option>
                  <option>Chimbarongo</option>
                  <option>Lolol</option>
                  <option>Nancagua</option>
                  <option>Palmilla</option>
                  <option>Peralillo</option>
                  <option>Placilla</option>
                  <option>Pumanque</option>
                  <option>San Fernando</option>
                  <option>Santa Cruz</option>
                  <option>Cauquenes</option>
                  <option>Chanco</option>
                  <option>Pelluhue</option>
                  <option>Curicó</option>
                  <option>Hualañé</option>
                  <option>Licantén</option>
                  <option>Molina</option>
                  <option>Rauco</option>
                  <option>Romeral</option>
                  <option>Sagrada Familia</option>
                  <option>Teno</option>
                  <option>Vichuquén</option>
                  <option>Colbún</option>
                  <option>Linares</option>
                  <option>Longaví</option>
                  <option>Parral</option>
                  <option>Retiro</option>
                  <option>San Javier</option>
                  <option>Villa Alegre</option>
                  <option>Yerbas Buenas</option>
                  <option>Constitución</option>
                  <option>Curepto</option>
                  <option>Empedrado</option>
                  <option>Maule</option>
                  <option>Pelarco</option>
                  <option>Pencahue</option>
                  <option>Río Claro</option>
                  <option>San Clemente</option>
                  <option>San Rafael</option>
                  <option>Talca</option>
                  <option>Arauco</option>
                  <option>Cañete</option>
                  <option>Contulmo</option>
                  <option>Curanilahue</option>
                  <option>Lebu</option>
                  <option>Los Álamos</option>
                  <option>Tirúa</option>
                  <option>Alto Biobío</option>
                  <option>Antuco</option>
                  <option>Cabrero</option>
                  <option>Laja</option>
                  <option>Los Ángeles</option>
                  <option>Mulchén</option>
                  <option>Nacimiento</option>
                  <option>Negrete</option>
                  <option>Quilaco</option>
                  <option>Quilleco</option>
                  <option>San Rosendo</option>
                  <option>Santa Bárbara</option>
                  <option>Tucapel</option>
                  <option>Yumbel</option>
                  <option>Chiguayante</option>
                  <option>Concepción</option>
                  <option>Coronel</option>
                  <option>Florida</option>
                  <option>Hualpén</option>
                  <option>Hualqui</option>
                  <option>Lota</option>
                  <option>Penco</option>
                  <option>San Pedro de La Paz</option>
                  <option>Santa Juana</option>
                  <option>Talcahuano</option>
                  <option>Tomé</option>
                  <option>Bulnes</option>
                  <option>Chillán</option>
                  <option>Chillán Viejo</option>
                  <option>Cobquecura</option>
                  <option>Coelemu</option>
                  <option>Coihueco</option>
                  <option>El Carmen</option>
                  <option>Ninhue</option>
                  <option>Ñiquen</option>
                  <option>Pemuco</option>
                  <option>Pinto</option>
                  <option>Portezuelo</option>
                  <option>Quillón</option>
                  <option>Quirihue</option>
                  <option>Ránquil</option>
                  <option>San Carlos</option>
                  <option>San Fabián</option>
                  <option>San Ignacio</option>
                  <option>San Nicolás</option>
                  <option>Treguaco</option>
                  <option>Yungay</option>
                  <option>Carahue</option>
                  <option>Cholchol</option>
                  <option>Cunco</option>
                  <option>Curarrehue</option>
                  <option>Freire</option>
                  <option>Galvarino</option>
                  <option>Gorbea</option>
                  <option>Lautaro</option>
                  <option>Loncoche</option>
                  <option>Melipeuco</option>
                  <option>Nueva Imperial</option>
                  <option>Padre Las Casas</option>
                  <option>Perquenco</option>
                  <option>Pitrufquén</option>
                  <option>Pucón</option>
                  <option>Saavedra</option>
                  <option>Temuco</option>
                  <option>Teodoro Schmidt</option>
                  <option>Toltén</option>
                  <option>Vilcún</option>
                  <option>Villarrica</option>
                  <option>Angol</option>
                  <option>Collipulli</option>
                  <option>Curacautín</option>
                  <option>Ercilla</option>
                  <option>Lonquimay</option>
                  <option>Los Sauces</option>
                  <option>Lumaco</option>
                  <option>Purén</option>
                  <option>Renaico</option>
                  <option>Traiguén</option>
                  <option>Victoria</option>
                  <option>Corral</option>
                  <option>Lanco</option>
                  <option>Los Lagos</option>
                  <option>Máfil</option>
                  <option>Mariquina</option>
                  <option>Paillaco</option>
                  <option>Panguipulli</option>
                  <option>Valdivia</option>
                  <option>Futrono</option>
                  <option>La Unión</option>
                  <option>Lago Ranco</option>
                  <option>Río Bueno</option>
                  <option>Ancud</option>
                  <option>Castro</option>
                  <option>Chonchi</option>
                  <option>Curaco de Vélez</option>
                  <option>Dalcahue</option>
                  <option>Puqueldón</option>
                  <option>Queilén</option>
                  <option>Quemchi</option>
                  <option>Quellón</option>
                  <option>Quinchao</option>
                  <option>Calbuco</option>
                  <option>Cochamó</option>
                  <option>Fresia</option>
                  <option>Frutillar</option>
                  <option>Llanquihue</option>
                  <option>Los Muermos</option>
                  <option>Maullín</option>
                  <option>Puerto Montt</option>
                  <option>Puerto Varas</option>
                  <option>Osorno</option>
                  <option>Puero Octay</option>
                  <option>Purranque</option>
                  <option>Puyehue</option>
                  <option>Río Negro</option>
                  <option>San Juan de la Costa</option>
                  <option>San Pablo</option>
                  <option>Chaitén</option>
                  <option>Futaleufú</option>
                  <option>Hualaihué</option>
                  <option>Palena</option>
                  <option>Aisén</option>
                  <option>Cisnes</option>
                  <option>Guaitecas</option>
                  <option>Cochrane</option>
                  <option>O'higgins</option>
                  <option>Tortel</option>
                  <option>Coihaique</option>
                  <option>Lago Verde</option>
                  <option>Chile Chico</option>
                  <option>Río Ibáñez</option>
                  <option>Antártica</option>
                  <option>Cabo de Hornos</option>
                  <option>Laguna Blanca</option>
                  <option>Punta Arenas</option>
                  <option>Río Verde</option>
                  <option>San Gregorio</option>
                  <option>Porvenir</option>
                  <option>Primavera</option>
                  <option>Timaukel</option>
                  <option>Natales</option>
                  <option>Torres del Paine</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div class="relative h-12">
          <button
            class="focus:shadow-outline absolute inset-y-0 right-0 rounded bg-[#3b82f6] px-4 py-2 font-bold text-background hover:bg-[#1d4ed8] focus:outline-none"
            type="submit"
          >
            Aceptar
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- SignOut -->
  <button
    class="focus:shadow-outline mt-1 rounded bg-[#3b82f6] px-4 py-2 font-bold text-background hover:bg-[#1d4ed8] focus:outline-none"
    @click="handleSignOut"
  >
    Sign Out
  </button>
</template>

<style scoped></style>
