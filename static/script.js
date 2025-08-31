async function myFunction() {
  // Get the text field
  var copyText = document.getElementById("myInput");
  if (!copyText) {
    console.error('Element with id "myInput" not found.');
    alert('Unable to find the text to copy.');
    return;
  }

  // If the element is not an input/textarea, create a temporary textarea
  var isInput = copyText.tagName === 'INPUT' || copyText.tagName === 'TEXTAREA';
  var target = copyText;
  var removeTemp = false;
  if (!isInput) {
    target = document.createElement('textarea');
    target.style.position = 'absolute';
    target.style.left = '-9999px';
    target.value = copyText.textContent || copyText.innerText || '';
    document.body.appendChild(target);
    removeTemp = true;
  }

  // Select the text field
  try {
    target.select();
    target.setSelectionRange(0, target.value.length); // For mobile devices
  } catch (e) {
    // ignore selection errors
  }

  // Copy the text inside the text field (use clipboard API with fallback)
  try {
    await navigator.clipboard.writeText(target.value);
    alert("Copied the text: " + target.value);
  } catch (err) {
    try {
      document.execCommand('copy');
      alert("Copied the text: " + target.value);
    } catch (e) {
      console.error('Copy failed', e);
      alert('Unable to copy text.');
    }
  } finally {
    if (removeTemp) {
      document.body.removeChild(target);
    }
  }
}