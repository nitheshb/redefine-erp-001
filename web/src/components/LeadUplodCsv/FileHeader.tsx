import { Button, Grid } from '@material-ui/core'
import React from 'react'
import { TrashIcon } from '@heroicons/react/outline'

export interface FileHeaderProps {
  file: File
  onDelete: (file: File) => void
}

export function FileHeader({ file, onDelete }: FileHeaderProps) {
  return (
    <Grid container justify="space-between" alignItems="center">
      <Grid item>{file.name}</Grid>

        <span className="py-2 cursor-pointer">
        <TrashIcon
          onClick={() => onDelete(file)}
          className="h-5 w-5 hover:text-red-600 "
          aria-hidden="true"
        />
        </span>

    </Grid>
  )
}
