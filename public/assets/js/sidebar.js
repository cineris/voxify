switch (window.location.pathname) {
    case '/dashboard':
        console.log('dash')
        document.getElementById('sideDashboard').classList.add('highlight')
        break
    case '/project':
        console.log('project')
        if (window.location.search == '?new=true') {
            document.getElementById('sideAddProject').classList.add('highlight')
        }
        break
    case '/profile':
        console.log('profile')
        document.getElementById('sideProfile').classList.add('highlight')
        break
    default:
        break
}

document.getElementById('sideProjects').addEventListener('click', (e) => {
    if (document.getElementById('sideProjects').classList.contains('collapsed')) {
        console.log('oops')
        document.getElementById('sideProjects').classList.remove('highlight')
    }
    else    document.getElementById('sideProjects').classList.add('highlight')
})
