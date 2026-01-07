<script>
    import { portal } from '@/Utils/portal.js';
    
    let { 
        id = '',
        name = '',
        startDate = $bindable(''),
        endDate = $bindable(''),
        label = '',
        placeholder = 'Select date range',
        error = '',
        required = false,
        disabled = false,
        minDate = null,
        maxDate = null,
        format = 'YYYY-MM-DD',
        size = 'md',
        showPresets = true,
        onchange = null
    } = $props();
    
    let inputId = $derived(id || `daterangepicker-${Math.random().toString(36).substr(2, 9)}`);
    let inputName = $derived(name || inputId);
    
    let isOpen = $state(false);
    let triggerRef = $state(null);
    let dropdownRef = $state(null);
    let dropdownPosition = $state({ top: 0, left: 0, width: 0 });
    
    let currentMonth = $state(new Date().getMonth());
    let currentYear = $state(new Date().getFullYear());
    
    // Selection state: null = nothing selected, 'start' = selecting end date
    let selectionState = $state(null);
    let hoverDate = $state(null);
    
    const sizes = {
        sm: 'py-1.5 text-sm',
        md: 'py-2 text-sm',
        lg: 'py-2.5 text-base'
    };
    
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December'];
    const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    
    // Quick preset ranges
    const presets = [
        { label: 'Today', days: 0 },
        { label: 'Last 7 days', days: 7 },
        { label: 'Last 30 days', days: 30 },
        { label: 'This month', type: 'thisMonth' },
        { label: 'Last month', type: 'lastMonth' }
    ];
    
    // Helper to parse date string to local Date
    function parseLocalDate(dateStr) {
        if (!dateStr) return null;
        if (dateStr instanceof Date) return dateStr;
        const [year, month, day] = dateStr.split('-').map(Number);
        return new Date(year, month - 1, day);
    }
    
    let startDateObj = $derived(startDate ? parseLocalDate(startDate) : null);
    let endDateObj = $derived(endDate ? parseLocalDate(endDate) : null);
    
    let displayValue = $derived(() => {
        if (!startDate && !endDate) return '';
        if (startDate && !endDate) return `${formatDisplayDate(parseLocalDate(startDate))} → ...`;
        if (startDate && endDate) return `${formatDisplayDate(parseLocalDate(startDate))} → ${formatDisplayDate(parseLocalDate(endDate))}`;
        return '';
    });
    
    // Calculate days count in range
    let daysCount = $derived(() => {
        if (!startDateObj || !endDateObj) return 0;
        const diff = endDateObj.getTime() - startDateObj.getTime();
        return Math.ceil(diff / (1000 * 60 * 60 * 24)) + 1;
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
    
    function formatDisplayDate(date) {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    }
    
    function toDateString(year, month, day) {
        return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
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
            const dropdownHeight = 420;
            const gap = 4;
            
            const showAbove = spaceBelow < dropdownHeight && spaceAbove > spaceBelow;
            
            dropdownPosition = {
                top: showAbove 
                    ? rect.top - dropdownHeight - gap
                    : rect.bottom + gap,
                left: rect.left,
                width: 320,
                showAbove
            };
        }
    }
    
    function openDropdown() {
        if (disabled) return;
        updateDropdownPosition();
        isOpen = true;
        
        if (startDateObj) {
            currentMonth = startDateObj.getMonth();
            currentYear = startDateObj.getFullYear();
        }
    }
    
    function closeDropdown() {
        isOpen = false;
        selectionState = null;
        hoverDate = null;
    }
    
    function toggleDropdown() {
        if (isOpen) closeDropdown();
        else openDropdown();
    }
    
    function applyPreset(preset) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        let start, end;
        
        if (preset.type === 'thisMonth') {
            start = new Date(today.getFullYear(), today.getMonth(), 1);
            end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        } else if (preset.type === 'lastMonth') {
            start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
            end = new Date(today.getFullYear(), today.getMonth(), 0);
        } else if (preset.days === 0) {
            start = today;
            end = today;
        } else {
            start = new Date(today);
            start.setDate(start.getDate() - preset.days + 1);
            end = today;
        }
        
        startDate = toDateString(start.getFullYear(), start.getMonth(), start.getDate());
        endDate = toDateString(end.getFullYear(), end.getMonth(), end.getDate());
        selectionState = null;
        
        currentMonth = start.getMonth();
        currentYear = start.getFullYear();
        
        onchange?.({ startDate, endDate });
    }
    
    function selectDate(dayInfo) {
        if (isDisabled(dayInfo)) return;
        
        const dateStr = toDateString(dayInfo.year, dayInfo.month, dayInfo.day);
        const date = new Date(dayInfo.year, dayInfo.month, dayInfo.day);
        
        if (!selectionState) {
            // First click - set start date
            startDate = dateStr;
            endDate = '';
            selectionState = 'start';
        } else {
            // Second click - set end date
            const start = parseLocalDate(startDate);
            
            if (date < start) {
                // If clicked date is before start, swap them
                endDate = startDate;
                startDate = dateStr;
            } else {
                endDate = dateStr;
            }
            
            selectionState = null;
            onchange?.({ startDate, endDate });
        }
    }
    
    function handleMouseEnter(dayInfo) {
        if (selectionState === 'start' && !isDisabled(dayInfo)) {
            hoverDate = new Date(dayInfo.year, dayInfo.month, dayInfo.day);
        }
    }
    
    function handleMouseLeave() {
        hoverDate = null;
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
    
    function isStartDate(dayInfo) {
        if (!startDateObj) return false;
        return dayInfo.day === startDateObj.getDate() &&
               dayInfo.month === startDateObj.getMonth() &&
               dayInfo.year === startDateObj.getFullYear();
    }
    
    function isEndDate(dayInfo) {
        if (!endDateObj) return false;
        return dayInfo.day === endDateObj.getDate() &&
               dayInfo.month === endDateObj.getMonth() &&
               dayInfo.year === endDateObj.getFullYear();
    }
    
    function isInRange(dayInfo) {
        if (!startDateObj) return false;
        const date = new Date(dayInfo.year, dayInfo.month, dayInfo.day);
        date.setHours(0, 0, 0, 0);
        
        if (endDateObj) {
            // Range is complete
            const start = new Date(startDateObj);
            const end = new Date(endDateObj);
            start.setHours(0, 0, 0, 0);
            end.setHours(0, 0, 0, 0);
            return date > start && date < end;
        } else if (hoverDate && selectionState === 'start') {
            // Hovering while selecting end date
            const start = new Date(startDateObj);
            const end = new Date(hoverDate);
            start.setHours(0, 0, 0, 0);
            end.setHours(0, 0, 0, 0);
            
            if (end >= start) {
                return date > start && date < end;
            } else {
                return date > end && date < start;
            }
        }
        return false;
    }
    
    function isHoverEnd(dayInfo) {
        if (!hoverDate || selectionState !== 'start') return false;
        const date = new Date(dayInfo.year, dayInfo.month, dayInfo.day);
        date.setHours(0, 0, 0, 0);
        const hover = new Date(hoverDate);
        hover.setHours(0, 0, 0, 0);
        return date.getTime() === hover.getTime();
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
    
    // Check position for connected range styling
    function getRangePosition(dayInfo) {
        const start = isStartDate(dayInfo);
        const end = isEndDate(dayInfo);
        const inRange = isInRange(dayInfo);
        
        if (start && end) return 'single';
        if (start) return 'start';
        if (end) return 'end';
        if (inRange) return 'middle';
        return null;
    }
    
    function handleClickOutside(event) {
        if (
            triggerRef && !triggerRef.contains(event.target) &&
            dropdownRef && !dropdownRef.contains(event.target)
        ) {
            closeDropdown();
        }
    }
    
    function clearDates() {
        startDate = '';
        endDate = '';
        selectionState = null;
        onchange?.({ startDate: '', endDate: '' });
    }
    
    function applyAndClose() {
        if (startDate && endDate) {
            onchange?.({ startDate, endDate });
            closeDropdown();
        }
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
    
    <input type="hidden" name="{inputName}_start" value={startDate} />
    <input type="hidden" name="{inputName}_end" value={endDate} />
    
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
            <i class="fas fa-calendar-alt text-gray-400"></i>
            <span class="{displayValue() ? 'text-gray-900' : 'text-gray-500'}">
                {displayValue() || placeholder}
            </span>
            {#if daysCount() > 0}
                <span class="text-xs px-1.5 py-0.5 bg-primary-100 text-primary-700 rounded">
                    {daysCount()} days
                </span>
            {/if}
        </div>
        <div class="flex items-center gap-1">
            {#if startDate || endDate}
                <button 
                    type="button"
                    onclick={(e) => { e.stopPropagation(); clearDates(); }}
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
            class="fixed z-[9999] bg-white rounded-xl shadow-xl border border-gray-200 p-4"
            style="top: {dropdownPosition.top}px; left: {dropdownPosition.left}px; width: {dropdownPosition.width}px;"
        >
            <!-- Quick Presets -->
            {#if showPresets}
                <div class="flex flex-wrap gap-1.5 mb-3 pb-3 border-b border-gray-100">
                    {#each presets as preset}
                        <button
                            type="button"
                            onclick={() => applyPreset(preset)}
                            class="px-2.5 py-1 text-xs font-medium rounded-full transition-colors
                                   bg-gray-100 text-gray-600 hover:bg-primary-100 hover:text-primary-700"
                        >
                            {preset.label}
                        </button>
                    {/each}
                </div>
            {/if}
            
            <!-- Selection Status -->
            <div class="mb-3 text-center">
                {#if !selectionState}
                    <span class="text-sm text-gray-500">
                        <i class="fas fa-hand-pointer mr-1"></i>
                        Select <span class="font-medium text-gray-700">start date</span>
                    </span>
                {:else}
                    <span class="text-sm text-primary-600">
                        <i class="fas fa-calendar-check mr-1"></i>
                        Now select <span class="font-medium">end date</span>
                    </span>
                {/if}
            </div>
            
            <!-- Header -->
            <div class="flex items-center justify-between mb-3">
                <button 
                    type="button"
                    onclick={prevMonth}
                    class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <i class="fas fa-chevron-left text-gray-600"></i>
                </button>
                
                <span class="font-semibold text-gray-900">
                    {monthNames[currentMonth]} {currentYear}
                </span>
                
                <button 
                    type="button"
                    onclick={nextMonth}
                    class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <i class="fas fa-chevron-right text-gray-600"></i>
                </button>
            </div>
            
            <!-- Day names -->
            <div class="grid grid-cols-7 gap-0 mb-1">
                {#each dayNames as day}
                    <div class="text-center text-xs font-medium text-gray-400 py-1">
                        {day}
                    </div>
                {/each}
            </div>
            
            <!-- Calendar grid -->
            <div class="grid grid-cols-7 gap-0">
                {#each calendarDays() as dayInfo}
                    {@const start = isStartDate(dayInfo)}
                    {@const end = isEndDate(dayInfo)}
                    {@const inRange = isInRange(dayInfo)}
                    {@const hoverEnd = isHoverEnd(dayInfo)}
                    {@const today = isToday(dayInfo)}
                    {@const disabledDay = isDisabled(dayInfo)}
                    {@const position = getRangePosition(dayInfo)}
                    
                    <!-- Range background strip -->
                    <div class="relative">
                        {#if (inRange || (start && endDate) || (end && startDate)) && dayInfo.isCurrentMonth}
                            <div class="absolute inset-y-0.5
                                        {start ? 'left-1/2 right-0' : ''}
                                        {end ? 'left-0 right-1/2' : ''}
                                        {inRange ? 'left-0 right-0' : ''}
                                        bg-primary-50">
                            </div>
                        {/if}
                        {#if hoverEnd && selectionState === 'start' && dayInfo.isCurrentMonth}
                            <div class="absolute inset-y-0.5 left-0 right-1/2 bg-primary-50/50"></div>
                        {/if}
                        
                        <button
                            type="button"
                            onclick={() => selectDate(dayInfo)}
                            onmouseenter={() => handleMouseEnter(dayInfo)}
                            onmouseleave={handleMouseLeave}
                            disabled={disabledDay}
                            class="relative w-full h-9 text-sm transition-all flex items-center justify-center
                                   {start || end ? 'bg-primary-600 text-white font-semibold rounded-full z-10' : ''}
                                   {hoverEnd && !end && !start ? 'bg-primary-400 text-white rounded-full z-10' : ''}
                                   {today && !start && !end && !inRange && !hoverEnd ? 'ring-2 ring-primary-500 ring-inset rounded-full' : ''}
                                   {!dayInfo.isCurrentMonth ? 'text-gray-300' : ''}
                                   {dayInfo.isCurrentMonth && !start && !end && !inRange && !hoverEnd && !disabledDay ? 'text-gray-700 hover:bg-gray-100 rounded-full' : ''}
                                   {disabledDay ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}
                                   {(start || end) && !disabledDay ? 'hover:bg-primary-700' : ''}"
                        >
                            {dayInfo.day}
                        </button>
                    </div>
                {/each}
            </div>
            
            <!-- Selected range display -->
            {#if startDate}
                <div class="mt-4 pt-3 border-t border-gray-100">
                    <div class="flex flex-col items-center gap-1">
                        <div class="flex items-center gap-2 text-sm">
                            <span class="px-2 py-0.5 bg-primary-100 text-primary-700 rounded font-medium">
                                {formatDisplayDate(parseLocalDate(startDate))}
                            </span>
                            <i class="fas fa-arrow-right text-gray-400 text-xs"></i>
                            {#if endDate}
                                <span class="px-2 py-0.5 bg-primary-100 text-primary-700 rounded font-medium">
                                    {formatDisplayDate(parseLocalDate(endDate))}
                                </span>
                            {:else}
                                <span class="px-2 py-0.5 bg-gray-100 text-gray-400 rounded italic">
                                    Select end
                                </span>
                            {/if}
                        </div>
                        {#if daysCount() > 0}
                            <span class="text-xs text-gray-500">
                                {daysCount()} days selected
                            </span>
                        {/if}
                    </div>
                </div>
            {/if}
            
            <!-- Footer -->
            <div class="mt-3 pt-3 border-t border-gray-100 flex justify-between">
                <button 
                    type="button"
                    onclick={clearDates}
                    class="px-3 py-1.5 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <i class="fas fa-times mr-1"></i>
                    Clear
                </button>
                <button 
                    type="button"
                    onclick={applyAndClose}
                    disabled={!startDate || !endDate}
                    class="px-4 py-1.5 text-sm font-medium rounded-lg transition-colors
                           {startDate && endDate 
                               ? 'bg-primary-600 text-white hover:bg-primary-700' 
                               : 'bg-gray-100 text-gray-400 cursor-not-allowed'}"
                >
                    <i class="fas fa-check mr-1"></i>
                    Apply
                </button>
            </div>
        </div>
    </div>
{/if}
