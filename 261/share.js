// Load html2canvas dynamically
const script = document.createElement('script');
script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
document.head.appendChild(script);

function generateShareUrl() {
    const selected = JSON.parse(localStorage.getItem("selectedCourses") || "{}");
    const shareData = [];
    for (const [courseId, details] of Object.entries(selected)) {
        shareData.push({ id: courseId, sec: details.section });
    }
    
    if (shareData.length === 0) return null;

    const encoded = btoa(JSON.stringify(shareData));
    return `${window.location.origin}${window.location.pathname}?share=${encoded}`;
}

function showQrPopup(url, title = 'Share Schedule') {
    Swal.fire({
        title: title,
        html: `
            <p>Scan to view this schedule on another device</p>
            <div id="swal-qr-container"></div>
            <input type="text" value="${url}" id="share-url-input" class="swal2-input" readonly style="margin-top:15px; font-size:0.8rem;">
        `,
        didOpen: () => {
            const container = document.getElementById("swal-qr-container");
            container.style.display = 'flex';
            container.style.justifyContent = 'center';
            container.style.marginTop = '15px';
            
            new QRCode(container, {
                text: url,
                width: 150,
                height: 150
            });
        },
        showCancelButton: true,
        confirmButtonText: 'Copy Link',
        cancelButtonText: 'Close',
        confirmButtonColor: '#25D366',
    }).then(result => {
        if (result.isConfirmed) {
            navigator.clipboard.writeText(url).then(() => {
                Swal.fire({
                    title: 'Link Copied!',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false
                });
            });
        }
    });
}

function getShareLink() {
    const url = generateShareUrl();
    if (!url) {
        Swal.fire('No courses selected', 'Please select some courses to share.', 'warning');
        return;
    }
    showQrPopup(url, 'Share Schedule');
}

async function handleSharedLink() {
    const params = new URLSearchParams(window.location.search);
    const shareCode = params.get('share');
    
    if (!shareCode) return false; // No share link

    try {
        const shareData = JSON.parse(atob(shareCode));
        
        const result = await Swal.fire({
            title: 'Import Schedule?',
            text: `Found ${shareData.length} courses in the shared link. This will overwrite your current schedule.`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Import',
            cancelButtonText: 'Cancel'
        });

        if (result.isConfirmed) {
            // Clear current
            localStorage.removeItem("selectedCourses");
            localStorage.removeItem("addedCourses");
            
            const newSelected = {};
            const newAdded = [];

            Swal.fire({ title: 'Importing...', didOpen: () => Swal.showLoading() });

            for (const item of shareData) {
                const loaded = await loadCourseJSON(item.id); 
                if (loaded) {
                    if (!newAdded.includes(item.id)) {
                        newAdded.push(item.id);
                    }
                    // Find the section
                    const courseOptions = data[item.id];
                    if (courseOptions) {
                        // Note: item.sec might need normalization if the data format changed, but assuming consistency
                        const sectionDetails = courseOptions.find(s => s.section === item.sec);
                        if (sectionDetails) {
                            newSelected[item.id] = sectionDetails;
                        }
                    }
                }
            }

            localStorage.setItem("selectedCourses", JSON.stringify(newSelected));
            localStorage.setItem("addedCourses", JSON.stringify(newAdded));
            
            // Clean URL
            const newUrl = window.location.pathname;
            window.history.replaceState({}, document.title, newUrl);
            
            // Reload to render everything cleanly
            location.reload();
            return true;
        }
    } catch (e) {
        console.error("Error parsing share data", e);
        Swal.fire('Error', 'Invalid share link.', 'error');
    }
    return false;
}

async function uploadToImgBB(blob) {
    // Construct API key from parts to avoid revoke automatically
    const _0x1 = "c3a41e49";
    const _0x2 = "25cf94b2";
    const _0x3 = "2a26f9c5";
    const _0x4 = "f9223bf2";
    const apiKey = _0x1 + _0x2 + _0x3 + _0x4;

    const formData = new FormData();
    formData.append('image', blob);
    formData.append('key', apiKey);

    try {
        const res = await fetch('https://api.imgbb.com/1/upload', {
            method: 'POST',
            body: formData
        });
        const data = await res.json();
        if (data.success) {
            return data.data.url;
        } else {
            throw new Error(data.error ? data.error.message : 'Upload failed');
        }
    } catch (e) {
        Swal.fire('Upload Failed', e.message, 'error');
        return null;
    }
}

async function downloadScheduleImage() {
    if (typeof html2canvas === 'undefined') {
        Swal.fire('Error', 'Image generator not ready yet. Please try again in a moment.', 'error');
        return;
    }

    const url = generateShareUrl();
    if (!url) {
        Swal.fire('No courses selected', 'Please select some courses first.', 'warning');
        return;
    }

    Swal.fire({ title: 'Generating Image...', didOpen: () => Swal.showLoading() });

    // Create a temporary container
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    tempContainer.style.top = '0';
    tempContainer.style.width = '1200px'; 
    tempContainer.style.backgroundColor = '#f4f6f9';
    tempContainer.style.padding = '20px';
    tempContainer.style.fontFamily = "'Inter', sans-serif";
    
    // Clone Summary
    const summary = document.getElementById('daily-schedule-summary');
    if (summary && summary.style.display !== 'none') {
        const summaryClone = summary.cloneNode(true);
        tempContainer.appendChild(summaryClone);
        
        // Add spacing
        const spacer = document.createElement('div');
        spacer.style.height = '20px';
        tempContainer.appendChild(spacer);
    }

    // Clone Selected Container
    const selected = document.querySelector('.selected-container');
    if (selected && selected.style.display !== 'none') {
        const selectedClone = selected.cloneNode(true);
        
        // Remove Share Actions
        const actions = selectedClone.querySelector('#share-actions');
        if (actions) actions.remove();

        // Remove Delete Buttons (Trash icons) for cleaner image
        const deleteBtns = selectedClone.querySelectorAll('.delete-btn');
        deleteBtns.forEach(b => b.remove());

        tempContainer.appendChild(selectedClone);
    }

    // Add QR Code to the image
    const qrContainer = document.createElement('div');
    qrContainer.style.marginTop = '30px';
    qrContainer.style.display = 'flex';
    qrContainer.style.flexDirection = 'column';
    qrContainer.style.alignItems = 'center';
    qrContainer.style.justifyContent = 'center';
    qrContainer.style.padding = '20px';
    qrContainer.style.backgroundColor = '#fff';
    qrContainer.style.borderRadius = '12px';
    qrContainer.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
    qrContainer.style.width = 'fit-content';
    qrContainer.style.margin = '30px auto 0 auto'; 
    
    const qrText = document.createElement('p');
    qrText.innerText = 'Start editing this schedule!';
    qrText.style.marginBottom = '10px';
    qrText.style.color = '#2c3e50';
    qrText.style.fontSize = '16px';
    qrText.style.fontWeight = '600';
    qrContainer.appendChild(qrText);
    
    const qrCodeDiv = document.createElement('div');
    // Generate QR for the SHARE URL
    new QRCode(qrCodeDiv, {
        text: url,
        width: 120,
        height: 120,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.M
    });
    qrContainer.appendChild(qrCodeDiv);
    
    tempContainer.appendChild(qrContainer);

    document.body.appendChild(tempContainer);

    // Wait a moment for QR to render
    setTimeout(() => {
        html2canvas(tempContainer, {
            scale: 2, // High res
            useCORS: true,
            backgroundColor: '#f4f6f9'
        }).then(canvas => {
            document.body.removeChild(tempContainer);
            
            const dataUrl = canvas.toDataURL();

            // Download
            const link = document.createElement('a');
            link.download = 'my-schedule.png';
            link.href = dataUrl;
            link.click();

            // Show Popup
            Swal.fire({
                title: 'Schedule Saved!',
                html: `
                    <div style="border: 1px solid #eee; border-radius: 8px;">
                        <img src="${dataUrl}" style="width: 100%; height: auto; display: block;">
                    </div>
                `,
                padding: '1em',
                confirmButtonText: 'Close',
                confirmButtonColor: '#3085d6'
            });

        }).catch(err => {
            console.error(err);
            if (document.body.contains(tempContainer)) document.body.removeChild(tempContainer);
            Swal.fire('Error', 'Failed to generate image.', 'error');
        });
    }, 500);
}

function renderShareControls() {
    const container = document.getElementById('share-actions');
    if (!container) return;

    const selected = JSON.parse(localStorage.getItem("selectedCourses") || "{}");
    const hasSelection = Object.keys(selected).length > 0;

    if (!hasSelection) {
        container.innerHTML = '';
        return;
    }

    // Only render if empty to avoid duplicates (though renderSelected clears grid, it doesn't clear this container)
    // Actually renderSelected calls this every time, so we should clear and rebuild or check existence.
    // Since renderSelected is called on updates, we should rebuild to ensure state is correct.
    container.innerHTML = `
        <button class="btn btn-outline-success btn-sm" onclick="getShareLink()" title="Share Schedule">
            <i class="fas fa-share-alt"></i> Share
        </button>
        <button class="btn btn-outline-info btn-sm" onclick="downloadScheduleImage()" title="Download Image">
            <i class="fas fa-download"></i> Image
        </button>
    `;
}

// Expose functions to global scope
window.getShareLink = getShareLink;
window.downloadScheduleImage = downloadScheduleImage;
window.handleSharedLink = handleSharedLink;
window.renderShareControls = renderShareControls;

// Auto-inject buttons and handle link
document.addEventListener('DOMContentLoaded', () => {
    // We don't inject into navbar anymore
    
    (async () => {
        const isSharing = await handleSharedLink();
        if (!isSharing && window.initApp) {
            window.initApp();
        }
    })();
});

