import Derivation from "./components/Derivation"
import DanglingElse from "./components/DanglingElse"
import FiniteAutomata from "./components/FiniteAutomata"

const route = [
  { path: "/derivation", component: Derivation },
  { path: "/dangling-else", component: DanglingElse },
  { path: "/finite-automata", component: FiniteAutomata }
]

export default route