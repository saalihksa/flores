export function useUi() {
  const menuOpen = useState('menu-open', () => false)
  const contactOpen = useState('contact-open', () => false)
  const contactProject = useState('contact-project', () => '')
  const hovering = useState('cursor-hover', () => false)
  const introReady = useState('intro-ready', () => false)

  function openMenu() {
    contactOpen.value = false
    menuOpen.value = true
  }

  function closeMenu() {
    menuOpen.value = false
  }

  function openContact(projectSlug?: string) {
    menuOpen.value = false
    contactProject.value = projectSlug ?? ''
    contactOpen.value = true
  }

  function closeContact() {
    contactOpen.value = false
    contactProject.value = ''
  }

  return {
    menuOpen,
    contactOpen,
    contactProject,
    hovering,
    introReady,
    openMenu,
    closeMenu,
    openContact,
    closeContact,
  }
}
