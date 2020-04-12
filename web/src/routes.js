import Home from '../pages/Home.vue'
import Parcel from '../pages/Parcel.vue'
import Parcels from '../pages/Parcels.vue'
import NotFound from '../pages/NotFound.vue'

export default [
    { path: '/', redirect: '/home' },
    { path: '/home', name: "Home", component: Home },
    { path: '/parcels', name: "Parcels", component: Parcels },
    { path: '/parcel', name: "Add Parcel", component: Parcel },
    { path: '/parcel/:id', name: "Edit Parcel", component: Parcel },
    { path: '*', name: "Not Found", component: NotFound }
]