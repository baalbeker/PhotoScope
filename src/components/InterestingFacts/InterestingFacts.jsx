import { PHOTOGRAPHY_FACTS } from "../../common/constants";


const displayRandomFact = () => {
    const randomFact = PHOTOGRAPHY_FACTS[Math.floor(Math.random() * PHOTOGRAPHY_FACTS.length)];
    return randomFact;
}
export default displayRandomFact;