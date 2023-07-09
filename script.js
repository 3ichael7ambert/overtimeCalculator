function calculateOvertime() {
    const option = document.getElementById('option').value;
    let hours, hourlyRate, grandTotal, result;

    if (option === 'hoursAndRate') {
      hours = parseFloat(document.getElementById('hours').value);
      hourlyRate = parseFloat(document.getElementById('hourlyRate').value);
      result = calculateOvertimeByHoursAndRate(hours, hourlyRate);
    } else if (option === 'grandTotalAndRate') {
      grandTotal = parseFloat(document.getElementById('grandTotal').value);
      hourlyRate = parseFloat(document.getElementById('hourlyRate2').value);
      hours = calculateHoursFromGrandTotalAndRate(grandTotal, hourlyRate);
      result = calculateOvertimeByGrandTotalAndRate(grandTotal, hourlyRate);
    } else if (option === 'grandTotalAndHours') {
      grandTotal = parseFloat(document.getElementById('grandTotal2').value);
      hours = parseFloat(document.getElementById('hours2').value);
      hourlyRate = calculateHourlyRateFromGrandTotalAndHours(grandTotal, hours);
      result = calculateOvertimeByGrandTotalAndHours(grandTotal, hours);
    }

    document.getElementById('result').textContent = `Overtime: $${result.toFixed(2)}`;
  }

  function toggleInputSections() {
    const option = document.getElementById('option').value;

    if (option === 'hoursAndRate') {
      document.getElementById('hoursRateInputs').style.display = 'block';
      document.getElementById('grandTotalRateInputs').style.display = 'none';
      document.getElementById('grandTotalHoursInputs').style.display = 'none';
    } else if (option === 'grandTotalAndRate') {
      document.getElementById('hoursRateInputs').style.display = 'none';
      document.getElementById('grandTotalRateInputs').style.display = 'block';
      document.getElementById('grandTotalHoursInputs').style.display = 'none';
    } else if (option === 'grandTotalAndHours') {
      document.getElementById('hoursRateInputs').style.display = 'none';
      document.getElementById('grandTotalRateInputs').style.display = 'none';
      document.getElementById('grandTotalHoursInputs').style.display = 'block';
    }
  }

  function calculateOvertimeByHoursAndRate(hours, hourlyRate) {
    const regularPay = hours <= 40 ? hours * hourlyRate : 40 * hourlyRate;
    const overtimePay = hours > 40 ? (hours - 40) * (hourlyRate * 1.5) : 0;
    return regularPay + overtimePay;
  }

  function calculateHoursFromGrandTotalAndRate(grandTotal, hourlyRate) {
    const regularPay = grandTotal <= 40 * hourlyRate ? grandTotal : 40 * hourlyRate;
    const overtimePay = grandTotal - regularPay;
    return (regularPay / hourlyRate) + (overtimePay / (hourlyRate * 1.5));
  }

  function calculateOvertimeByGrandTotalAndRate(grandTotal, hourlyRate) {
    const hours = calculateHoursFromGrandTotalAndRate(grandTotal, hourlyRate);
    const regularPay = hours <= 40 ? hours * hourlyRate : 40 * hourlyRate;
    const overtimePay = hours > 40 ? (hours - 40) * (hourlyRate * 1.5) : 0;
    return regularPay + overtimePay;
  }

  function calculateHourlyRateFromGrandTotalAndHours(grandTotal, hours) {
    const overtimePay = grandTotal - (hours * 40);
    const hourlyRate = grandTotal / (hours * 40 + overtimePay);
    return hourlyRate;
  }