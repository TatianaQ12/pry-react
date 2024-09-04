export const canShowSidebar = (idmembership: number) => {
  return ![9,8,4].includes(idmembership)
}
