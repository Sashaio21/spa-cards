// Извлекает значения по заданному ключу из массива объектов и возвращает уникальные значения
// уникальные значения нужны для выбора из списка
export function pluckStringsOrNumbers<T, K extends keyof T>(
    items: T[],
    key: K
  ): (string | number)[] {
    const rawValues = items.flatMap(item => {
      const value = item[key];
      if (Array.isArray(value)) {
        return value;
      }
      if (typeof value === "object" && value !== null) {
        return Object.values(value);
      }
      return [value];
    });
    const filtered = rawValues.filter(
      (v): v is string | number => typeof v === "string" || typeof v === "number"
    );
  
    return Array.from(new Set(filtered));
  }