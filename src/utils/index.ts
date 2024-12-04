export const formatCurrency = (mount: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'EUR'
    }).format(mount)
}
export const formatDate = (createdAt: string | Date): string => {
    const date = new Date(createdAt); 
    return date.toLocaleDateString('es-ES', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}
export const getImagePath = (imagePath: string) => {
    if (imagePath.startsWith('https://res.cloudinary.com')) {
        return imagePath
    } else {
        return `/products/${imagePath}`
    }
}