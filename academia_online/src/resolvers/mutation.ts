import { IResolvers } from 'graphql-tools';
import _ from 'lodash';
import { database } from '../data/data.store';

const mutation: IResolvers = {
    Mutation: {
        cursoNuevo(__: void, { curso }): any {
            const itemCurso = {
                id: String(database.cursos.length + 1),
                title: curso.title,
                description: curso.description,
                clases: curso.clases,
                time: curso.time,
                level: curso.level,
                logo: curso.logo,
                path: curso.path,
                teacher: curso.teacher,
                reviews: []
            }
            if (database.cursos.filter(item => item.title === itemCurso.title).length === 0){
                database.cursos.push(itemCurso);
                return itemCurso;
            }            
            return {
                id: '-1',
                title: `Un curso ya eziste con este titulo ${curso.title}`,
                description: '',
                clases: -1,
                time: 0.0,
                level: 'TODOS',
                logo: '',
                path: '',
                teacher: '',
                reviews: []
            };
        },
        modificarCurso(__: void, {curso}):any {
            const cursoExistente = _.findIndex(database.cursos, function(o) {
               return o.id === curso.id 
            });
            if (cursoExistente > -1){
                const valoraciones = database.cursos[cursoExistente].reviews;
                curso.reviews = valoraciones;
                database.cursos[cursoExistente] = curso;
                return curso;
            }
            return {
                id: '-1',
                title: `No existe el curso`,
                description: '',
                clases: -1,
                time: 0.0,
                level: 'TODOS',
                logo: '',
                path: '',
                teacher: '',
                reviews: []
            }
        },
        eliminarCurso(__: void, {id}):any {
            const cursoABorrar = _.remove(database.cursos, function(cursos) {
               return cursos.id === id; 
            });
            if(cursoABorrar[0] === undefined){
                return {
                    id: '-1',
                    title: `No existe el curso con el id ${id}`,
                    description: '',
                    clases: -1,
                    time: 0.0,
                    level: 'TODOS',
                    logo: '',
                    path: '',
                    teacher: '',
                    reviews: []
                };
            }
            return cursoABorrar[0];
        }
    }
}

export default mutation;