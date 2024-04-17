import { atom } from "recoil";


export const filterAtoms = atom({
    key: 'filterAtoms',
    default: {
        fieldOfInterest: '',
        techStack: '',
        dateOfGrad: '',
        search: ''
    }
})
