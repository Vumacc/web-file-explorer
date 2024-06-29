const fileExplorer = document.querySelector('.file-explorer');
const clickBlinker = document.querySelector('.click-status-blinker');
const enterBlinker = document.querySelector('.enter-status-blinker');
const upBlinker = document.querySelector('.up-status-blinker');
const downBlinker = document.querySelector('.down-status-blinker');
let pointerIndex = 0;

const tab2 = '\u00A0\u00A0'
const tab4 = '\u00A0\u00A0\u00A0\u00A0'
const tab6 = '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'
const tab8 = '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'

const fileStructure = {
    'Vumacc/Terminal-Portfolio/':                                                                         [{ name: 'root/', isDirectory: true }, { name: 'docs/', isDirectory: true }],
        'Vumacc/Terminal-Portfolio/docs/':                                                                [{ name: '..', isDirectory: true }, { name: '<span style="color: red;">ERROR</span> : NO FOLDER DATA AVAILABLE', isDirectory: false }],
        'Vumacc/Terminal-Portfolio/root/':                                                                [{ name: '..', isDirectory: true }, { name: '.github/', isDirectory: true }, { name: 'src/', isDirectory: true }, { name: '.firebaserc', isDirectory: false }, { name: '.gitattributes', isDirectory: false }, { name: '.gitignore', isDirectory: false }, { name: '404.html', isDirectory: false }, { name: 'CNAME', isDirectory: false }, { name: 'LICENSE', isDirectory: false }, { name: 'README.md', isDirectory: false }, { name: 'firebase.json', isDirectory: false }, { name: 'index.html', isDirectory: false }],
            'Vumacc/Terminal-Portfolio/root/.github/':                                                    [{ name: '..', isDirectory: true }, { name: 'workflows/', isDirectory: true }],
                'Vumacc/Terminal-Portfolio/root/.github/workflows/':                                      [{ name: '..', isDirectory: true }, { name: 'firebase-hosting-pull-request.yml', isDirectory: false }],
                    'Vumacc/Terminal-Portfolio/root/.github/workflows/firebase-hosting-pull-request.yml': [{ name: '..', isDirectory: true }, { name: '# This file was auto-generated by the Firebase CLI', isDirectory: false }, { name: '# https://github.com/firebase/firebase-tools', isDirectory: false }, { name: 'name: Deploy to Firebase Hosting on PR', isDirectory: false }, { name: 'on: pull_request', isDirectory: false }, { name: 'permissions:', isDirectory: false }, { name: `${tab2}contents: read`, isDirectory: false }, { name: `${tab2}pull-requests: write`, isDirectory: false }, { name: 'jobs:', isDirectory: false }, { name: `${tab4}build_and_preview:`, isDirectory: false }, { name: `${tab6}if: \${{ github.event.pull_request.head.repo.full_name == github.repository }}`, isDirectory: false }, { name: `${tab6}runs-on: ubuntu-latest`, isDirectory: false }, { name: `${tab6}steps:`, isDirectory: false }, { name: `${tab8}- uses: actions/checkout@v4`, isDirectory: false }, { name: `${tab8}- uses: FirebaseExtended/action-hosting-deploy@v0`, isDirectory: false }, { name: `${tab8}with:`, isDirectory: false }, { name: `${tab8}repoToken: \${{ secrets.GITHUB_TOKEN }}`, isDirectory: false }, { name: `${tab8}firebaseServiceAccount: \${{ secrets.FIREBASE_SERVICE_ACCOUNT_VUMACK }}`, isDirectory: false }, { name: `${tab8}projectId: vumack`, isDirectory: false }],
        'Vumacc/Terminal-Portfolio/root/src/':                                                            [{ name: '..', isDirectory: true }, { name: 'assets/', isDirectory: true }, { name: 'script.js', isDirectory: false }, { name: 'style.css', isDirectory: false }],
        'Vumacc/Terminal-Portfolio/root/.firebaserc':                                                     [{ name: '..', isDirectory: true }, { name: '{', isDirectory: false }, { name: `${tab2}"projects": {`, isDirectory: false }, { name: `${tab4}"default": "vumack"`, isDirectory: false }, { name: `${tab2}}`, isDirectory: false }, { name: '}', isDirectory: false }],
        'Vumacc/Terminal-Portfolio/root/.gitattributes':                                                  [{ name: '..', isDirectory: true }, { name: '# Auto detect text files and perform LF normalization', isDirectory: false }, { name: '* text=auto', isDirectory: false }],
        'Vumacc/Terminal-Portfolio/root/.gitignore':                                                      [{ name: '..', isDirectory: true }, { name: '', isDirectory: false }],
        'Vumacc/Terminal-Portfolio/root/404.html':                                                        [{ name: '..', isDirectory: true }, { name: '', isDirectory: false }],
        'Vumacc/Terminal-Portfolio/root/CNAME':                                                           [{ name: '..', isDirectory: true }, { name: 'vumack.firebaseapp.com', isDirectory: false }],
        'Vumacc/Terminal-Portfolio/root/LICENSE':                                                         [{ name: '..', isDirectory: true }, { name: '', isDirectory: false }],
        'Vumacc/Terminal-Portfolio/root/README.md':                                                       [{ name: '..', isDirectory: true }, { name: '', isDirectory: false }],
        'Vumacc/Terminal-Portfolio/root/firebase.json':                                                   [{ name: '..', isDirectory: true }, { name: '{', isDirectory: false }, { name: `${tab8}"hosting": {`, isDirectory: false }, { name: `${tab8}"public": "/",`, isDirectory: false }, { name: `${tab8}"ignore": [`, isDirectory: false }, { name: `${tab8}"firebase.json",`, isDirectory: false }, { name: `${tab8}"**/.*",`, isDirectory: false }, { name: `${tab8}"**/node_modules/**"`, isDirectory: false }, { name: `${tab8}]`, isDirectory: false }, { name: `${tab8}}`, isDirectory: false }, { name: '}', isDirectory: false }],
        'Vumacc/Terminal-Portfolio/root/index.html':                                                      [{ name: '..', isDirectory: true }, { name: '', isDirectory: false }],
};

let currentPath = 'Vumacc/Terminal-Portfolio/root/';

function renderFileExplorer(path) {
    const files = fileStructure[path];
    console.log(`Rendering path: ${path}`);
    if (!files) {
        console.error(`Path not found: ${path}`);
        return;
    }
    let content = `<span class="file-path">${path}</span> <br>`;
    files.forEach((file, index) => {
        content += `<span class="file-explorer-pointer">${index === pointerIndex ? '>' : '&nbsp;'}</span> <a class="${index === pointerIndex ? 'selected' : ''}">${file.name}</a> <br>`;
    });
    fileExplorer.innerHTML = content;
}

renderFileExplorer(currentPath);

function updateSelectedFile() {
    const selectedFileDisplay = document.getElementById('selected-file');
    selectedFileDisplay.textContent = `Selected file: ${fileStructure[currentPath][pointerIndex].name}`;
}

function updatePointer() {
    const fileExplorerPointers = document.querySelectorAll('.file-explorer-pointer');
    const fileLinks = document.querySelectorAll('.file-explorer a');
    fileExplorerPointers.forEach((pointer, index) => {
        if (index === pointerIndex) {
            pointer.textContent = '>';
            fileLinks[index].classList.add('selected');
        } else {
            pointer.textContent = '\u00A0'; // Non-breaking space
            fileLinks[index].classList.remove('selected');
        }
    });
}

function handleArrowKeyPress(event) {
    const fileExplorerPointers = document.querySelectorAll('.file-explorer-pointer');
    if (event.key === 'ArrowUp' && pointerIndex > 0) {
        pointerIndex--;
        upBlinker.style.color = '#04ff00';
        upBlinker.innerHTML = 'ACTIVE';
        setTimeout(() => {
            upBlinker.style.color = 'red';
            upBlinker.innerHTML = 'INACTIVE';
        }, 75);
    } else if (event.key === 'ArrowDown' && pointerIndex < fileExplorerPointers.length - 1) {
        pointerIndex++;
        downBlinker.style.color = '#04ff00';
        downBlinker.innerHTML = 'ACTIVE';
        setTimeout(() => {
            downBlinker.style.color = 'red';
            downBlinker.innerHTML = 'INACTIVE';
        }, 75);
    }
    document.getElementById('pointer-index').textContent = `Pointer Index: ${pointerIndex}`;
    updatePointer();
    updateSelectedFile();
}

function handleEnterKeyPress() {
    enterBlinker.style.color = '#04ff00';
    enterBlinker.innerHTML = 'ACTIVE';

    const selectedFile = fileStructure[currentPath][pointerIndex];
    if (selectedFile.name === '..') {
        const pathParts = currentPath.split('/');
        if (pathParts.length > 3) {
            pathParts.pop(); // Remove empty part
            pathParts.pop(); // Remove current directory
            currentPath = pathParts.join('/') + '/';
        } else {
            currentPath = 'Vumacc/Terminal-Portfolio/';
        }
    } else if (selectedFile.isDirectory) {
        currentPath = `${currentPath}${selectedFile.name}`;
    } else if (!selectedFile.isDirectory) {
        currentPath = `${currentPath}${selectedFile.name}`;
    }

    pointerIndex = 0;
    renderFileExplorer(currentPath);
    updatePointer();
    updateSelectedFile();

    setTimeout(() => {
        enterBlinker.style.color = 'red';
        enterBlinker.innerHTML = 'INACTIVE';
    }, 75);
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        handleArrowKeyPress(event);
    } else if (event.key === 'Enter') {
        handleEnterKeyPress();
    }
});

document.addEventListener('click', () => {
    clickBlinker.style.color = '#04ff00';
    clickBlinker.innerHTML = 'ACTIVE';
    setTimeout(() => {
        clickBlinker.style.color = 'red';
        clickBlinker.innerHTML = 'INACTIVE';
    }, 75);
});

document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    document.getElementById('pointer-coordinates').textContent = `Cursor position: (${x}, ${y})`;
});

updatePointer();
updateSelectedFile();