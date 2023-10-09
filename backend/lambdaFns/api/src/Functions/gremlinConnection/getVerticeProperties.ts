import { gremlinConnection } from "./gremlinConnection";

export default async function getVerticeProperties<T extends { id: string }>(
  vertice: T[],
): Promise<T[]> {
  const gremlin = new gremlinConnection();

  const objects: T[] = await Promise.all(
    vertice.map(async (vertex) => {
      const properties = await gremlin.g.V(vertex.id).properties().toList();
      let object: T = properties.reduce((acc: any, next: any) => {
        acc[next.label] = next.value;
        return acc;
      }, {});
      object.id = vertex.id;
      return object;
    }),
  );

  gremlin.close();
  return objects;
}
