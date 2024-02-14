const mockUsers = [{
    id: 1,
    name: "juan perez",
    email: "jaj@gmil.com"
}]

class User{
    find(){
        return new Promise((resolve,reject)=>{ 
            setTimeout(() => {
                resolve([...mockUsers]) //arreglo de usuarios (copia)
            }, 1000);
        })
    }
    insert(newUser){
        mockUsers.push(newUser);
    }
}

module.exports = User; //no se exporta instancia porque cada usuario es diferente