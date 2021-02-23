import Derivation from "./components/Derivation"
import DanglingElse from "./components/DanglingElse"
import FiniteAutomata from "./components/FiniteAutomata"
import LeftRecursion from "./components/LeftRecursion"
import LL1Gen from "./components/LL1Gen"
import LR1Gen from "./components/LR1Gen"

const route = [
  { path: "/derivation", component: Derivation },
  { path: "/dangling-else", component: DanglingElse },
  { path: "/finite-automata", component: FiniteAutomata },
  { path: "/left-recur", component: LeftRecursion },
  { path: "/ll1-gen", component: LL1Gen },
  { path: "/lr1-gen", component: LR1Gen }
]

export default route