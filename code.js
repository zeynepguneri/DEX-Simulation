import {Command} from 'commander';
import chalk from 'chalk';
import fs from 'fs';
import readline from 'readline';
import promptSync from 'prompt-sync';
const prompt = promptSync();

function likidite_func(){
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (!data) return; 
        const jsonData = JSON.parse(data);
        const pool = jsonData.pool;
        const userBalance = jsonData.userBalance;
        const tokenAInput = Number(prompt('Token A miktarını giriniz: '));
        const tokenBInput = Number(prompt('Token B miktarını giriniz: '));
    if (userBalance.tokenA < tokenAInput || userBalance.tokenB < tokenBInput) {
        console.log(chalk.red('Yeterli bakiyeniz yok.'));
        return;
      }
    else {
        userBalance.tokenA -= tokenAInput;
        userBalance.tokenB -= tokenBInput;
        pool.tokenA += tokenAInput;
        pool.tokenB += tokenBInput;
        pool.K = pool.tokenA * pool.tokenB;
        fs.writeFileSync('data.json', JSON.stringify({ pool, userBalance }, null, 2));
        console.log("Likidite başarıyla eklendi.")
        console.log('Havuz durumu:', pool);
        console.log('Yeni bakiyeniz:', userBalance);
    }
    });
}

function swap_func(){
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (!data) return; 
        const jsonData = JSON.parse(data);
        const pool = jsonData.pool;
        const userBalance = jsonData.userBalance;
        const tokenOutput = prompt('Göndermek istediğiniz token(A ya da B): ');
        const tokenInput = prompt('Almak istediğiniz token: ');
        if (tokenInput === 'B' && tokenOutput === 'A'){
            const tokenBInput = parseFloat(prompt('Almak istediğiniz tokenB miktarı: '));
            const tokenAOutput = pool.K / (pool.tokenB - tokenBInput) - pool.tokenA;
            userBalance.tokenB += tokenBInput;
            userBalance.tokenA -= tokenAOutput;
            pool.tokenA += tokenAOutput;
            pool.tokenB -= tokenBInput;
            fs.writeFileSync('data.json', JSON.stringify({ pool, userBalance }, null, 2));
            console.log("Swap işlemi başarıyla gerçekleşti.")
            console.log('Havuz durumu:', pool);
            console.log('Yeni bakiyeniz:', userBalance);
        }else if (tokenInput === 'A' && tokenOutput === 'B'){
            const tokenAInput = parseFloat(prompt('Almak istediğiniz tokenA miktarı: '));
            const tokenBOutput = pool.K / (pool.tokenA - tokenAInput) - pool.tokenB;
            userBalance.tokenA += tokenAInput;
            userBalance.tokenB -= tokenBOutput;
            pool.tokenA += tokenBOutput;
            pool.tokenB -= tokenAInput;
            fs.writeFileSync('data.json', JSON.stringify({ pool, userBalance }, null, 2));
            console.log("Swap işlemi başarıyla gerçekleşti.")
            console.log('Havuz durumu:', pool);
            console.log('Yeni bakiyeniz:', userBalance);
        }else {
            console.log("Girdiğiniz token çifti geçersiz.")
        }
    });
}

const program = new Command();
program
    .command('menü')
    .description('Kullanıcıya menüyü göster.')
    .action(()=>{
        console.log('\n1. Likidite ekle');
        console.log('2. Swap');
        console.log('3. Havuz durumunu görüntüle');
        console.log('4. Bakiye görüntüle');
        console.log('5. Çıkış');
})
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
rl.question('Yapmak istediğiniz işlemi seçiniz: ', (answer) => {
    const giris = answer;
    switch(giris){
        case '1':
            console.log("Likidite ekleniyor.")
            likidite_func()
            break;
        case '2':
            console.log("Swap yapılıyor.")
            swap_func()
            break;
        case '3':
            console.log("Havuz durumu görüntüleniyor.")
            break;
        case '4':
            console.log("Bakiye görüntüleniyor.")
            break;
        case '5':
            console.log("Çıkış yapılıyor.")
            break;
    }
    rl.close(); 
  });

program.parse(process.argv);
