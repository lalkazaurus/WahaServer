import('./app.js').then(appModule => {
  const app = appModule.default; 
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
}).catch(err => {
  console.error('Error loading app:', err);
});