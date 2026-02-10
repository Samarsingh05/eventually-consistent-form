export function submitToMockApi(data) {
  return new Promise((resolve, reject) => {
    const rand = Math.random()

    if (rand < 0.33) {
      setTimeout(() => resolve({ status: 200, data }), 800)
    } 
    else if (rand < 0.66) {
      setTimeout(() => reject({ status: 503 }), 800)
    } 
    else {
      const delay = 5000 + Math.random() * 5000
      setTimeout(() => resolve({ status: 200, data }), delay)
    }
  })
}
