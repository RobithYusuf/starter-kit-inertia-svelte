/**
 * Format a number with locale-specific thousands separators
 * @param {number|string} value - The number to format
 * @param {string} locale - The locale to use for formatting (default: 'en-US')
 * @param {Object} options - Additional formatting options
 * @returns {string} - The formatted number
 */
export function formatNumber(value, locale = 'en-US', options = {}) {
    if (value === null || value === undefined || value === '') {
        return '0';
    }
    
    const num = typeof value === 'string' ? parseFloat(value) : value;
    
    if (isNaN(num)) {
        return '0';
    }
    
    return num.toLocaleString(locale, options);
}

/**
 * Format a number as currency
 * @param {number|string} value - The number to format
 * @param {string} currency - The currency code (default: 'USD')
 * @param {string} locale - The locale to use for formatting (default: 'en-US')
 * @returns {string} - The formatted currency
 */
export function formatCurrency(value, currency = 'USD', locale = 'en-US') {
    if (value === null || value === undefined || value === '') {
        return formatNumber(0, locale, {
            style: 'currency',
            currency: currency
        });
    }
    
    const num = typeof value === 'string' ? parseFloat(value) : value;
    
    if (isNaN(num)) {
        return formatNumber(0, locale, {
            style: 'currency',
            currency: currency
        });
    }
    
    return formatNumber(num, locale, {
        style: 'currency',
        currency: currency
    });
}

/**
 * Format a number as a percentage
 * @param {number|string} value - The number to format (0-100)
 * @param {number} decimals - Number of decimal places (default: 0)
 * @param {string} locale - The locale to use for formatting (default: 'en-US')
 * @returns {string} - The formatted percentage
 */
export function formatPercentage(value, decimals = 0, locale = 'en-US') {
    if (value === null || value === undefined || value === '') {
        return '0%';
    }
    
    const num = typeof value === 'string' ? parseFloat(value) : value;
    
    if (isNaN(num)) {
        return '0%';
    }
    
    return formatNumber(num, locale, {
        style: 'percent',
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    });
}

/**
 * Format large numbers with abbreviations (K, M, B, T)
 * @param {number|string} value - The number to format
 * @param {number} decimals - Number of decimal places (default: 1)
 * @returns {string} - The formatted abbreviated number
 */
export function formatCompactNumber(value, decimals = 1) {
    if (value === null || value === undefined || value === '') {
        return '0';
    }
    
    const num = typeof value === 'string' ? parseFloat(value) : value;
    
    if (isNaN(num)) {
        return '0';
    }
    
    const absNum = Math.abs(num);
    const sign = num < 0 ? '-' : '';
    
    if (absNum >= 1e12) {
        return sign + (absNum / 1e12).toFixed(decimals) + 'T';
    } else if (absNum >= 1e9) {
        return sign + (absNum / 1e9).toFixed(decimals) + 'B';
    } else if (absNum >= 1e6) {
        return sign + (absNum / 1e6).toFixed(decimals) + 'M';
    } else if (absNum >= 1e3) {
        return sign + (absNum / 1e3).toFixed(decimals) + 'K';
    }
    
    return formatNumber(num);
}