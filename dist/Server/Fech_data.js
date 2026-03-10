export const Fetch_data = async () => {
    const req = await fetch('/json/Todo_list.json');
    const res = await req.json();
    return await res;
};
//# sourceMappingURL=Fech_data.js.map