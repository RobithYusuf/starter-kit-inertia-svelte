<script>
    import { portal } from '@/Utils/portal.js';
    
    let { 
        id = '',
        name = '',
        value = $bindable(''),
        label = '',
        placeholder = 'Select date',
        error = '',
        required = false,
        disabled = false,
        minDate = null,
        maxDate = null,
        format = 'YYYY-MM-DD',
        size = 'md',
        onchange = null
    } = $props();
    
    let inputId = $derived(id || `datepicker-${Math.random().toString(36).substr(2, 9)}`);
    let inputName = $derived(name || inputId);
    
    let isOpen = $state(false);
    let triggerRef = $state(null);
    let dropdownRef = $state(null);
    let dropdownPosition = $state({ top: 0, left: 0, width: 0 });
    
    let currentMonth = $state(new Date().getMonth());
    let currentYear = $state(new Date().getFullYear());
    
    // Helper to parse date string "YYYY-MM-DD" to local Date
    function parseLocalDate(dateStr) {
        if (!dateStr) return null;
        if (dateStr instanceof Date) return dateStr;
        const [year, month, day] = dateStr.split('-').map(Number);
        return new Date(year, month - 1, day);
    }
    
    const sizes = {
        sm: 'py-1.5 text-sm',
        md: 'py-2 text-sm',
        lg: 'py-2.5 text-base'
    };
    
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December'];
    const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    
    let selectedDate = $derived(value ? new Date(value) : null);
    
    let displayValue = $derived(() => {
        if (!value) return '';
        const date = new Date(value);
        return formatDate(date);
    });
    
    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        
        return format
            .replace('YYYY', year)
            .replace('MM', month)
            .replace('DD', day);
    }
    
    function getDaysInMonth(year, month) {
        return new Date(year, month + 1, 0).getDate();
    }
    
    function getFirstDayOfMonth(year, month) {
        return new Date(year, month, 1).getDay();
    }
    
    let calendarDays = $derived(() => {
        const daysInMonth = getDaysInMonth(currentYear, currentMonth);
        const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
        const days = [];
        
        // Previous month days
        const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
        const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
        const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth);
        
        for (let i = firstDay - 1; i >= 0; i--) {
            days.push({
                day: daysInPrevMonth - i,
                month: prevMonth,
                year: prevYear,
                isCurrentMonth: false
            });
        }
        
        // Current month days
        for (let i = 1; i <= daysInMonth; i++) {
            days.push({
                day: i,
                month: currentMonth,
                year: currentYear,
                isCurrentMonth: true
            });
        }
        
        // Next month days
        const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
        const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;
        const remainingDays = 42 - days.length;
        
        for (let i = 1; i <= remainingDays; i++) {
            days.push({
                day: i,
                month: nextMonth,
                year: nextYear,
                isCurrentMonth: false
            });
        }
        
        return days;
    });
    
    function updateDropdownPosition() {
        if (triggerRef) {
            const rect = triggerRef.getBoundingClientRect();
            const spaceBelow = window.innerHeight - rect.bottom;
            const spaceAbove = rect.top;
            const dropdownHeight = 340; // approximate calendar height
            const gap = 4;
            
            const showAbove = spaceBelow < dropdownHeight && spaceAbove > spaceBelow;
            
            dropdownPosition = {
                top: showAbove 
                    ? rect.top - dropdownHeight - gap
                    : rect.bottom + gap,
                left: rect.left,
                width: 280,
                showAbove
            };
        }
    }
    
    function openDropdown() {
        if (disabled) return;
        updateDropdownPosition();
        isOpen = true;
        
        if (selectedDate) {
            currentMonth = selectedDate.getMonth();
            currentYear = selectedDate.getFullYear();
        }
    }
    
    function closeDropdown() {
        isOpen = false;
    }
    
    function toggleDropdown() {
        if (isOpen) closeDropdown();
        else openDropdown();
    }
    
    function selectDate(dayInfo) {
        const date = new Date(dayInfo.year, dayInfo.month, dayInfo.day);
        
        if (minDate && date < new Date(minDate)) return;
        if (maxDate && date > new Date(maxDate)) return;
        
        value = `${dayInfo.year}-${String(dayInfo.month + 1).padStart(2, '0')}-${String(dayInfo.day).padStart(2, '0')}`;
        onchange?.(value);
        closeDropdown();
    }
    
    function prevMonth() {
        if (currentMonth === 0) {
            currentMonth = 11;
            currentYear--;
        } else {
            currentMonth--;
        }
    }
    
    function nextMonth() {
        if (currentMonth === 11) {
            currentMonth = 0;
            currentYear++;
        } else {
            currentMonth++;
        }
    }
    
    function isToday(dayInfo) {
        const today = new Date();
        return dayInfo.day === today.getDate() &&
               dayInfo.month === today.getMonth() &&
               dayInfo.year === today.getFullYear();
    }
    
    function isSelected(dayInfo) {
        if (!selectedDate) return false;
        return dayInfo.day === selectedDate.getDate() &&
               dayInfo.month === selectedDate.getMonth() &&
               dayInfo.year === selectedDate.getFullYear();
    }
    
    function isDisabled(dayInfo) {
        const date = new Date(dayInfo.year, dayInfo.month, dayInfo.day);
        date.setHours(0, 0, 0, 0);
        
        if (minDate) {
            const min = parseLocalDate(minDate);
            min.setHours(0, 0, 0, 0);
            if (date < min) return true;
        }
        if (maxDate) {
            const max = parseLocalDate(maxDate);
            max.setHours(0, 0, 0, 0);
            if (date > max) return true;
        }
        return false;
    }
    
    function isInRange(dayInfo) {
        if (!minDate && !maxDate) return true;
        const date = new Date(dayInfo.year, dayInfo.month, dayInfo.day);
        date.setHours(0, 0, 0, 0);
        
        const min = parseLocalDate(minDate);
        const max = parseLocalDate(maxDate);
        
        if (min) min.setHours(0, 0, 0, 0);
        if (max) max.setHours(0, 0, 0, 0);
        
        if (min && max) {
            return date >= min && date <= max;
        } else if (min) {
            return date >= min;
        } else if (max) {
            return date <= max;
        }
        return true;
    }
    
    function isRangeStart(dayInfo) {
        if (!minDate || !maxDate) return false;
        const date = new Date(dayInfo.year, dayInfo.month, dayInfo.day);
        date.setHours(0, 0, 0, 0);
        const min = parseLocalDate(minDate);
        min.setHours(0, 0, 0, 0);
        return date.getTime() === min.getTime();
    }
    
    function isRangeEnd(dayInfo) {
        if (!minDate || !maxDate) return false;
        const date = new Date(dayInfo.year, dayInfo.month, dayInfo.day);
        date.setHours(0, 0, 0, 0);
        const max = parseLocalDate(maxDate);
        max.setHours(0, 0, 0, 0);
        return date.getTime() === max.getTime();
    }
    
    function handleClickOutside(event) {
        if (
            triggerRef && !triggerRef.contains(event.target) &&
            dropdownRef && !dropdownRef.contains(event.target)
        ) {
            closeDropdown();
        }
    }
    
    function clearDate() {
        value = '';
        onchange?.('');
    }
    
    $effect(() => {
        if (isOpen) {
            document.addEventListener('click', handleClickOutside);
            window.addEventListener('scroll', updateDropdownPosition, true);
        }
        
        return () => {
            document.removeEventListener('click', handleClickOutside);
            window.removeEventListener('scroll', updateDropdownPosition, true);
        };
    });
</script>

<div>
    {#if label}
        <label for={inputId} class="block text-sm font-medium text-gray-700 mb-1">
            {label}
            {#if required}
                <span class="text-red-500">*</span>
            {/if}
        </label>
    {/if}
    
    <input type="hidden" name={inputName} {value} />
    
    <button
        bind:this={triggerRef}
        type="button"
        id={inputId}
        onclick={toggleDropdown}
        {disabled}
        class="w-full flex items-center justify-between pl-3 pr-3 {sizes[size]} border rounded-lg 
               text-left transition-all duration-200 
               focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500
               {error ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'}
               {disabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : 'bg-white cursor-pointer'}"
    >
        <div class="flex items-center gap-2">
            <i class="fas fa-calendar text-gray-400"></i>
            <span class="{displayValue() ? 'text-gray-900' : 'text-gray-500'}">
                {displayValue() || placeholder}
            </span>
        </div>
        <div class="flex items-center gap-1">
            {#if value}
                <button 
                    type="button"
                    onclick={(e) => { e.stopPropagation(); clearDate(); }}
                    class="p-1 hover:bg-gray-100 rounded"
                >
                    <i class="fas fa-times text-gray-400 text-xs"></i>
                </button>
            {/if}
            <i class="fas fa-chevron-down text-gray-400 text-sm transition-transform duration-200 {isOpen ? 'rotate-180' : ''}"></i>
        </div>
    </button>
    
    {#if error}
        <p class="mt-1 text-sm text-red-600">{error}</p>
    {/if}
</div>

{#if isOpen}
    <div use:portal>
        <div 
            bind:this={dropdownRef}
            class="fixed z-[9999] bg-white rounded-lg shadow-lg border border-gray-200 p-3"
            style="top: {dropdownPosition.top}px; left: {dropdownPosition.left}px; width: {dropdownPosition.width}px;"
        >
            <!-- Header -->
            <div class="flex items-center justify-between mb-3">
                <button 
                    type="button"
                    onclick={prevMonth}
                    class="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <i class="fas fa-chevron-left text-gray-600"></i>
                </button>
                
                <span class="font-medium text-gray-900">
                    {monthNames[currentMonth]} {currentYear}
                </span>
                
                <button 
                    type="button"
                    onclick={nextMonth}
                    class="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <i class="fas fa-chevron-right text-gray-600"></i>
                </button>
            </div>
            
            <!-- Day names -->
            <div class="grid grid-cols-7 gap-1 mb-1">
                {#each dayNames as day}
                    <div class="text-center text-xs font-medium text-gray-500 py-1">
                        {day}
                    </div>
                {/each}
            </div>
            
            <!-- Calendar grid -->
            <div class="grid grid-cols-7 gap-0.5">
                {#each calendarDays() as dayInfo}
                    {@const rangeStart = isRangeStart(dayInfo)}
                    {@const rangeEnd = isRangeEnd(dayInfo)}
                    {@const inRange = minDate && maxDate && isInRange(dayInfo) && !rangeStart && !rangeEnd}
                    {@const selected = isSelected(dayInfo)}
                    {@const today = isToday(dayInfo)}
                    {@const disabled = isDisabled(dayInfo)}
                    <button
                        type="button"
                        onclick={() => selectDate(dayInfo)}
                        disabled={disabled}
                        class="w-8 h-8 text-sm transition-colors rounded-md flex items-center justify-center
                               {rangeStart ? 'bg-primary-600 text-white font-semibold' : ''}
                               {rangeEnd ? 'bg-primary-600 text-white font-semibold' : ''}
                               {inRange && dayInfo.isCurrentMonth ? 'bg-primary-50' : ''}
                               {selected && !rangeStart && !rangeEnd ? 'bg-primary-600 text-white' : ''}
                               {today && !selected && !rangeStart && !rangeEnd ? 'ring-2 ring-primary-500 ring-inset' : ''}
                               {!dayInfo.isCurrentMonth ? 'text-gray-300' : ''}
                               {dayInfo.isCurrentMonth && !selected && !rangeStart && !rangeEnd && !disabled ? 'text-gray-700' : ''}
                               {disabled ? 'opacity-30 cursor-not-allowed line-through' : 'hover:bg-gray-100 cursor-pointer'}
                               {(selected || rangeStart || rangeEnd) && !disabled ? 'hover:bg-primary-700' : ''}"
                    >
                        {dayInfo.day}
                    </button>
                {/each}
            </div>
            
            <!-- Range Legend (only when min/max set) -->
            {#if minDate && maxDate}
                <div class="mt-2 flex items-center justify-center gap-4 text-xs text-gray-500">
                    <div class="flex items-center gap-1">
                        <span class="w-3 h-3 rounded bg-primary-600"></span>
                        <span>Min/Max</span>
                    </div>
                    <div class="flex items-center gap-1">
                        <span class="w-3 h-3 rounded bg-primary-50 border border-primary-200"></span>
                        <span>Available</span>
                    </div>
                </div>
            {/if}
            
            <!-- Footer -->
            <div class="mt-3 pt-3 border-t border-gray-100 flex justify-between">
                <button 
                    type="button"
                    onclick={() => {
                        const today = new Date();
                        currentMonth = today.getMonth();
                        currentYear = today.getFullYear();
                        selectDate({ day: today.getDate(), month: today.getMonth(), year: today.getFullYear() });
                    }}
                    class="text-sm text-primary-600 hover:text-primary-700"
                >
                    Today
                </button>
                <button 
                    type="button"
                    onclick={closeDropdown}
                    class="text-sm text-gray-500 hover:text-gray-700"
                >
                    Close
                </button>
            </div>
        </div>
    </div>
{/if}
