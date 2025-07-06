import { FastifyInstance } from 'fastify';

import { addMessage } from "../routes/analisescriticas/add-message";
import { createAnaliseCritica } from "../routes/analisescriticas/create";
import { findAnaliseCriticaByIndicador } from "../routes/analisescriticas/find-by-indicador-id";
import { createArea } from "../routes/area/create";
import { getAreaById } from "../routes/area/get-area-by-id";
import { getAreaBySlug } from "../routes/area/get-area-by-slug";
import { getAreas } from "../routes/area/get-areas";
import { getAreasByPeriodYear } from '../routes/area/get-areas-by-period-year';
import { getCategoryCodes } from "../routes/area/get-category-codes";
import { getAutoavaliacoesAreas } from "../routes/autoavaliacao/get-all";
import { getAutoavaliacaoAreaBySlug } from "../routes/autoavaliacao/get-by-slug";
import { addCodeItem } from '../routes/category/add-code-item';
import { createCategory } from '../routes/category/create';
import { getCategoriesByArea } from '../routes/category/get-by-area';
import { getCategoryById } from '../routes/category/get-by-id';
import { getGraphicByIndicador } from '../routes/graphics/get-indicador';
import { addOperationItem } from '../routes/indicador/add-operation-item';
import { catchOperationIdByIndicador } from '../routes/indicador/catch-operation-id-by-indicador';
import { createIndicador } from "../routes/indicador/create";
import { createOperation } from '../routes/indicador/create-operation';
import { getIndicadoresByCategoryId } from "../routes/indicador/get-by-category-id";
import { getIndicador } from "../routes/indicador/get-indicador";
import { getOperationItems } from '../routes/indicador/get-operation-items';
import { getTurnoversAcumulados } from '../routes/indicador/get-turnovers-acumulados';
import { getTurnoversMedios } from '../routes/indicador/get-turnovers-medios';
import { getAllIndicadoresByCategory } from '../routes/indicador/getAllIndicadoresByCategory';
import { indicadorVisibility } from '../routes/indicador/indicador-visibility';
import { removeOperationItem } from '../routes/indicador/remove-operation-item';
import { createTurnoverAcumulado } from '../routes/indicador/turnover-acumulado';
import { createTurnoverMedio } from '../routes/indicador/turnover-medio';
import { UpdateBoolean } from '../routes/indicador/update-boolean';
import { updateIndicadorName } from '../routes/indicador/update-indicador-name';
import { updateQualitativo } from '../routes/indicador/update-qualitativo';
import { updateValue } from '../routes/indicador/update-value';
import { createIndiceRemissivo } from "../routes/indices-remissivos/create";
import { listAllIndicesRemissivos } from "../routes/indices-remissivos/list-all";
import { changePeriodStatus } from "../routes/periods/change-period-status";
import { createPeriod } from "../routes/periods/create";
import { getPeriodById } from '../routes/periods/get-period-by-id';
import { getPeriods } from "../routes/periods/get-periods";
import { createUser } from "../routes/user/create";
import { getUserDetailsByEmail } from "../routes/user/get-user-details-by-email";
import { getUsers } from "../routes/user/get-users";
import { setUserToAdmin } from "../routes/user/set-user-to-admin";
import { deleteIndicador } from '../routes/indicador/delete';

export async function allRoutes(app: FastifyInstance) {
    app.register(createUser);
    app.register(createPeriod);
    app.register(createArea);
    app.register(createTurnoverAcumulado);
    app.register(createTurnoverMedio);
    app.register(createOperation)
    app.register(getAreas);
    app.register(getPeriods);
    app.register(getTurnoversAcumulados)
    app.register(getAreaBySlug);
    app.register(getCategoryCodes);
    app.register(createIndicador);
    app.register(getIndicadoresByCategoryId);
    app.register(createAnaliseCritica);
    app.register(findAnaliseCriticaByIndicador);
    app.register(createIndiceRemissivo);
    app.register(listAllIndicesRemissivos);
    app.register(addMessage);
    app.register(setUserToAdmin);
    app.register(getUsers);
    app.register(getUserDetailsByEmail);
    app.register(getAreaById);
    app.register(getAutoavaliacoesAreas);
    app.register(getIndicador);
    app.register(getAutoavaliacaoAreaBySlug);
    app.register(changePeriodStatus);
    app.register(updateValue)
    app.register(getTurnoversMedios)
    app.register(getCategoryById)
    app.register(getCategoriesByArea)
    app.register(catchOperationIdByIndicador)
    app.register(getOperationItems)
    app.register(createCategory)
    app.register(addOperationItem)
    app.register(addCodeItem)
    app.register(removeOperationItem)
    app.register(updateIndicadorName)
    app.register(indicadorVisibility)
    app.register(updateQualitativo)
    app.register(getAllIndicadoresByCategory)
    app.register(getPeriodById)
    app.register(UpdateBoolean)
    app.register(getAreasByPeriodYear)
    app.register(getGraphicByIndicador)
    app.register(deleteIndicador)
}
