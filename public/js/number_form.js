function increaseValue() {
  var value = parseInt(document.getElementById('number').value, 10);
  value = isNaN(value) ? 0 : value;
  value++;
  document.getElementById('number').value = value;
}

function decreaseValue() {
  var value = parseInt(document.getElementById('number').value, 10);
  value = isNaN(value) ? 0 : value;
  value < 1 ? (value = 1) : '';
  value--;
  document.getElementById('number').value = value;
}
function increaseDose() {
  var value = parseInt(document.getElementById('dose').value, 10);
  value = isNaN(value) ? 0 : value;
  value++;
  document.getElementById('dose').value = value;
}

function decreaseDose() {
  var value = parseInt(document.getElementById('dose').value, 10);
  value = isNaN(value) ? 0 : value;
  value < 1 ? (value = 1) : '';
  value--;
  document.getElementById('dose').value = value;
}
