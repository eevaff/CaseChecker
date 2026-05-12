import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App, { CaseCheckerPage, TruthOrLiePage, ResourcesPage, SecurityPage } from '../truthorlie-app'
import CaseCheckerApp from '../casechecker-app'
import LogoPlayground from './LogoPlayground'
import WordmarkApproval from './WordmarkApproval'

// Strip base path for GitHub Pages (e.g. /CaseChecker/casechecker → /casechecker)
const base = import.meta.env.BASE_URL.replace(/\/$/, '')
const raw = window.location.pathname
const path = base && raw.startsWith(base) ? raw.slice(base.length) || '/' : raw
const isLogoTest = path === '/logo'
const isWordmark = path === '/wordmark'
const isCaseChecker = path === '/casechecker'
const isCaseCheckerApp = path === '/casechecker-prototype'
const isTruthOrLie = path === '/truthorlie'
const isResources = path === '/resources'
const isSecurity = path === '/security'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isWordmark ? <WordmarkApproval /> : isLogoTest ? <LogoPlayground /> : isCaseCheckerApp ? <CaseCheckerApp /> : isCaseChecker ? <CaseCheckerPage /> : isTruthOrLie ? <TruthOrLiePage /> : isResources ? <ResourcesPage /> : isSecurity ? <SecurityPage /> : <CaseCheckerApp />}
  </StrictMode>,
)
