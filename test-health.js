import fetch from 'node-fetch';

async function testHealth() {
  try {
    const res = await fetch('http://localhost:3001/api/health');
    const data = await res.json();
    console.log('Health:', data);

    const rankRes = await fetch('http://localhost:3001/api/rankings');
    const rankData = await rankRes.json();
    console.log('Rankings count:', rankData.length);
  } catch(e) {
    console.error('Error:', e);
  }
}

testHealth();
