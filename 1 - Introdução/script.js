console.log("Hello");

console.log(`Executando o script a partir do diretório ${process.cwd()}`);

process.on('exit', ()=>{
  console.log("Script está prestes a terminar.");
});

const num = parseInt(process.argv[2]);

const fatorial = (num) => {
  if(num == 0){
    return 1;
  }

  return num * fatorial (num -1);
}

console.log(`O fatorial de ${num} é igual a ${fatorial(num)}`);
